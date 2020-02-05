# Continuously Deploying Angular to Azure Storage with Azure DevOps

Angular

# Introduction

In a previous  [article](https://dev.to/thisdotmedia/continuously-deploying-angular-to-azure-app-service-with-azure-devops-4hf2), we saw how to use Azure DevOps to deploy an Angular application to an Azure App Service running .NET Core.

Even though an Angular application works perfectly on an Azure App Service, we don't need a .NET runtime (or any other runtime such as nodejs, Ruby, PHP, ...) to host our Angular application if it's not using Server Side Rendering.

If you're using Server Side Rendering, you do need a runtime such as nodejs to be able to run a process that's responsible for rendering, and serving, the Angular application. In this article, we're deploying an application that doesn't use Server Side Rendering, so we have no need for such a runtime.

An Azure Storage Account is mostly used for storing blobs, and files, but it also contains a queue, and a NoSQL database with which you can integrate.

Apart from the above features, Azure Storage Account provides a way to host a static (HTML, CSS, JavaScript, and other assets) site, such as an Angular application. The hosting is free. You're only being billed for the blob storage taken by the files of your application. You can find more details on Azure Storage Blob pricing at  [https://azure.microsoft.com/en-us/pricing/details/storage/blobs/](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/).

# Creating a Storage Account

We can create a Storage Account through the Azure Portal; ensure you have an active subscription to which we can add the Storage Account. You can create one ([here](https://docs.microsoft.com/bs-latn-ba/azure/billing/billing-mca-create-subscription)  if you don't have one yet. Make sure you choose a Free Trial subscription in order to not be charged. A Free Trial shouldn't be used for production).

Inside the Azure Portal, navigate to All Services, and search for Storage accounts. Selecting Storage accounts from the search results will bring you to the Storage accounts overview. Click "add" to create a new Storage Account, and fill in the required information in the Basics tab:

![Creating Azure Storage Account](https://thepracticaldev.s3.amazonaws.com/i/mbqtm8d7edc22kkys306.png)

Select the subscription and resource group in which we want to create the storage account, and provide it with a name (the name has to be unique across all storage accounts in Azure). The other options can be left untouched. You can find more information about these configuration settings at  [https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction#types-of-storage-accounts](https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction#types-of-storage-accounts).

We don't need to change anything in the other tabs (Networking, Advanced and Tags). Go ahead and create the Storage Account. Azure should navigate you to the deployment details, showing the progress of the deployment. Once you have deployed, you should be able to click "Go to resource" in order to go to the created Storage Account.

![Storage Account deployment progress](https://thepracticaldev.s3.amazonaws.com/i/b0t36widuau372oly9jq.png)

As mentioned before, there are different ways we can make use of an Azure Storage. We're not going to cover the details of any of its features, other than hosting a static website.

### Configuring a Static Website

You can access the configuration regarding static websites from the Storage Account's side-menu (Settings ⇒ Static website)

![Storage Account side-menu](https://thepracticaldev.s3.amazonaws.com/i/2brtceydrshicagxhdnh.png)

As static website hosting is disabled by default, we need to enable it in order to be able to host a static website inside a Storage Account. Once enabled, we need to provide an index document name and, optionally, an error document path.

![Enable static website for Storage Account](https://thepracticaldev.s3.amazonaws.com/i/eykuu9dgpo2ux7nwz2sf.png)

The error document path should point to an HTML file that will be rendered when a request to Azure Storage returns a 404. Currently, we don't have such a file, so let's keep it empty for this article.

Once saved, you should see a primary and secondary endpoint being listed. These are the URLs on which the application, once deployed, will be available. Apart from the URL, you'll also see that a container, named  **$web**, has been created to host the static website.

![Static website endpoints](https://thepracticaldev.s3.amazonaws.com/i/34d57zi46tkj63afuxao.png)

As we haven't deployed any files yet, trying to open any of the endpoint URL's in your favorite browser will show the default 404 message (this is the message that would be replaced with an HTML file if we had configured an Error document path).

![Static Website default 404 message](https://thepracticaldev.s3.amazonaws.com/i/ajckmcorwehiawsnfrun.png)

# Configure a Release Pipeline for a Storage Account

We'll be creating a release pipeline that will use the artifacts published as part of the build pipeline that was configured in  [https://dev.to/thisdotmedia/continuously-integrating-angular-with-azure-devops-2k9l](https://dev.to/thisdotmedia/continuously-integrating-angular-with-azure-devops-2k9l). This article assumes that the Angular application that was used in the above article has been updated to include environmental configuration as described in  [https://dev.to/thisdotmedia/runtime-environment-configuration-with-angular-4f5j](https://dev.to/thisdotmedia/runtime-environment-configuration-with-angular-4f5j).

When inside an Azure DevOps project, create a new Release Pipeline by selecting Pipeline ⇒ Releases ⇒ New ⇒ New Release Pipeline

![Azure DevOps new release pipeline](https://thepracticaldev.s3.amazonaws.com/i/b8u8wwea0hipe50979qp.png)

We're not going to use a template for our release pipeline, so you can choose to start with an empty job instead of selecting a preconfigured template.

As Azure DevOps supports multiple stages, you can provide a name for the stage that's created by default, or you can keep Stage 1 as its name.

## Adding build artifacts

Let's start by adding the artifacts that we want to deploy to Azure Storage. Click Add an Artifact, select the Build source type (as the artifacts are stored within the build pipeline), and select the appropriate build pipeline from the source dropdown. You can keep the default values for both the version to deploy, as we always want to deploy the latest version, and the source alias. The source alias is the folder that will be used to download the artifacts. We will be using this value throughout the next steps when manipulating, and uploading the artifacts.

![Add build artifact](https://thepracticaldev.s3.amazonaws.com/i/vl4c5lenqoy64xgb0muf.png)

## Adding deployment tasks

As we have started with an empty job, there are no tasks defined yet. We'll need to add a task to deploy the artifact's files to an Azure Storage Account. To do so, we can make use of the integrated  **Azure file copy**  task by going to the tasks section, clicking the '+' on the Agent job, searching for Azure file copy, and clicking add.

![Release pipeline tasks configuration](https://thepracticaldev.s3.amazonaws.com/i/52gdawjq65sthfar334v.png)

When adding an Azure file copy task, you will need to provide the required information in order for Azure DevOps to know what files have to be deployed to which destination. This includes both the Azure Subscription, and the Storage Account information.

As we're going to deploy the build artifacts, which are configured to be available inside the release definition, we'll need to provide the path to the source that we want to deploy. You can navigate the artifacts, and select the appropriate folder, by clicking the  `...`  button.

Once we have configured the files that should be deployed, select your Azure Subscription, select Azure Blob as the Destination Type, choose the appropriate Storage Account that you want to use, and provide  **$web**  for the container name (this is the default container name used by Azure DevOps when enabling static websites inside an Azure Storage Account).

![Azure File Copy task configuration](https://thepracticaldev.s3.amazonaws.com/i/yqp9bcov63n8xfiqp0al.png)

## Environment specific configuration

As mentioned in the previous article ([https://dev.to/thisdotmedia/runtime-environment-configuration-with-angular-4f5j](https://dev.to/thisdotmedia/runtime-environment-configuration-with-angular-4f5j)), we're not making use of the built-in Angular environment system in order for our application to make use of environment-specific configuration.

As we want to avoid rebuilding the application in order for it to use environment-specific configuration, we're using a JSON file that's served as part of the assets directory, and is retrieved in our Angular application using an Http Request. You can find a detailed overview on how to configure this in the article mentioned above.

We will need a File transform task to modify the contents of the config.json file as part of our release pipeline's stage (in case of multiple stages, every stage can have its own step, and can replace the contents with different values before deploying). Add the task, and configure it to target the  **assets/config.json**  file inside our web-app artifact.

![File transform task configuration](https://thepracticaldev.s3.amazonaws.com/i/lctkrjo5ndw7x7ko958x.png)

Ensure this task is executed before deploying the files to Azure Storage.

![Tasks order](https://thepracticaldev.s3.amazonaws.com/i/xaeeyt4s3nlsd273282n.png)

In order for Azure DevOps to know what names and values it has to use while transforming the config file, we will need to create release pipeline variables. The file transform task will use all the variables, and update values based on its name.

All we need for now is for an apiUrl to be configurable for each environment, so we'll need an apiUrl pipeline variable (I went with [localhost](http://localhost/) locally and  [https://www.thisdot.co](https://www.thisdot.co/)  for the environment):

![Release pipeline variables](https://thepracticaldev.s3.amazonaws.com/i/63usmgp7xk54h2jndfwk.png)

## Continuous Deployment Trigger

Even though we could save the configuration, and create manual releases at this point, in order to continuously deploy our artifacts, we'll need to set up a trigger. Click on the lightning strike symbol that's showing up on your artifact in the pipeline section, enable the Continuous deployment trigger, and add a branch filter for the branch you want to deploy (which is master in this case). We don't need to enable the Pull request trigger for this article.

![Continuous Deployment trigger](https://thepracticaldev.s3.amazonaws.com/i/hdqw3aercayy54xkykyw.png)

You can save the release pipeline, and create a new release, either by running a new build, and making use of the continuous deployment trigger, or by manually creating a new release.

Once the deployment is finished, navigating to one of the Azure Storage endpoint URL's should show the Angular application, including the correct environment configuration being logged to the console.

![Angular application](https://thepracticaldev.s3.amazonaws.com/i/b0l3c0ix023tr0c6ed6a.png)

# Conclusion

Using an Azure Storage Account to host a static web application doesn't make deploying any different from deploying to an Azure App Service. However, when we're not making use of any server-side rendering technology, using a runtime such as .NET/PHP/Java is unnecessary, so we have no need to use an App Service.

Making use of Azure Storage lowers the costs since hosting itself is free, and you're only billed for the blob storage taken by the application's files. Even though App Services has free variants, once you start adding things such as custom domains, you'll need to use one of the paid variants. The cost of these are generally higher than that of an Azure Storage Account if all you're hosting is a static website.

_This Dot Inc. is a consulting company which contains two branches : the media stream, and labs stream. This Dot Media is the portion responsible for keeping developers up to date with advancements in the web platform. This Dot Labs provides teams with web platform expertise, using methods such as mentoring and training._