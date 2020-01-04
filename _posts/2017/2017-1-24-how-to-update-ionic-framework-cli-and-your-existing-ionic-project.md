---
layout: post
title: "How to update Ionic framework cli and your existing Ionic project"
image: "images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project.png"
excerpt: ""
categories : ionic
tags : ionic 
---

{% include image.html
   img="images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project.png"
       title="How to update Ionic framework cli and your existing Ionic project "
%}




As you know the Ionic framework is continuously updated and It’s now on version 2 
so developers are finding themselves all the time working with an old version ,well at least this is my case .In this post i’ll show you the way I follow to update both the Ionic CLI and Ionic library inside existing projects .

If you are looking for a one command to update Ionic ,unfortunately it doesn't exist till this moment , but don’t worry the steps to follow are not complex or long and here is how you do it 

Before you update your Ionic CLI and library you may need to check your currently installed version

How to get your current Ionic version ?
---------------------------------------
---------------------------------------

Go ahead open up your terminal under Linux or MAC or your command prompt under Windows and enter 

    ionic info
		
In my case i’m getting this output 

{% include image.html
   img="images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project/ionic-info-output.png"
       title="How to update Ionic framework cli and your existing Ionic project "
%} 


So the version of Ionic CLI is 2.1.0-beta.3 and the version of Ionic library is 2.1.0-beta.1

You can also execute the following command

	Ionic -v

Which displays the current version of the Ionic CLI 

{% include image.html
   img="images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project/ionic-display-version.png"
       title="How to update Ionic framework cli and your existing Ionic project "
%} 


So now ,after getting your Ionic CLI and library versions you should be able to decide if you need to update the framework or if you have already the most recent version of Ionic .

After that ,you need to know which is the latest version of Ionic to see if you have an old version or not so just go [Ionic framework official website](https://ionicframework.com) and verify the latest version

{% include image.html
   img="images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project/ionic-current-version.png"
       title="How to update Ionic framework cli and your existing Ionic project "
%} 

Updating the Ionic CLI and Library version 
--------------------------------------------
--------------------------------------------

You are not running the latest version of Ionic ,don’t worry you can easily update both the CLI and the library (for projects you are currently working on) so let's start by updating the Ionic CLI 

All you need to do is opening your terminal/command prompt and enter 

	npm update -g ionic 

If somehow that doesn’t work ,you can also uninstall ionic and reinstall it 

	npm uninstall -g ionic 
	npm install -g ionic

Under Linux or MAC you may need to do sudo before your npm commands ,and provide your sudo password ,depending on your system and npm settings .

Now you can execute the previous commands to verify your current version .

{% include image.html
   img="images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project/ionic-info-output2.png"
       title="How to update Ionic framework cli and your existing Ionic project "
%} 


For new projects that you scaffold the updated Ionic CLI will use the latest version of Ionic library but you have to add --v2 switch in order to use Ionic 2 instead of Ionic 1 which is still supported by Ionic team .

But if you need to update the Ionic library for an existing project generated with the old version then just enter to your project directory and execute the following command 

    ionic lib update


That is it ! The Ionic CLI will take care of downloading and updating the library 

Getting available Ionic versions on NPM
----------------------------------------
----------------------------------------

You can also view all available versions of Ionic that exist on NPM registry using 
    
    npm info ionic

{% include image.html
   img="images/content/how-to-update-ionic-framework-cli-and-your-existing-ionic-project/ionic-npm-versions.png"
       title="How to update Ionic framework cli and your existing Ionic project "
%} 



How to install a specific version of Ionic ?
---------------------------------------------
----------------------------------------------

Now what if you somehow need to install or use a specific version of Ionic ? is it possible to install a previous version of Ionic framework (CLI and library) ? yes it’s totally possible all you need to do is checking for available versions of Ionic using the command above and then install your chosen version with your terminal by issuing 

    npm install -g ionic@2.2.0

Conclusion
--------------

So this is how you can update your Ionic framework both the CLI and library .keep in mind that Ionic framework is always
adding new features and improvements so you need to keep your framework version updated to the latest release .













