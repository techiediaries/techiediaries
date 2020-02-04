I will explain about how you can create an Angular 9 application without installing 9 CLI RC version into your machine. Currently, I am using Angular CLI 8.3.20 version. This is the latest stable version of Angular.

![](https://www.c-sharpcorner.com/article/create-and-experiment-angular-9-rc-app-without-installing-9-cli/Images/01%20Angular%20CLI%208.png)

I have already created an Employee application in Angular 8. We will create one Angular 9 application with same src files used in Angular 8 version. I will showcase the basic performance benchmark between these two versions.

  

## Create an Angular 9 application using npx command

  

npx is a node package runner. Latest node installations automatically install npx in your local machine. Otherwise, you must install it using npm command. npx will help you to execute node packages without installing to your local machine.

You can use below npx command to install Angular 9 (latest RC version)

![](https://www.c-sharpcorner.com/article/create-and-experiment-angular-9-rc-app-without-installing-9-cli/Images/02%20Install%20Angular%209%20using%20npx.PNG)

**npx @angular/cli@next new EmployeeAngular9**

**@next**  will automatically installs the latest preview version from Angular repo. You can provide the specific RC version also.

**npx @angular/cli@9.0.0-rc.7 new EmployeeAngular9**

Above command will temporarily install Angular 9 CLI related files into your machine and then create new Angular application. It will not affect your previous Angular 8 CLI stable version.

Our Angular 9 application will be ready in few moments. You can see the package details inside the package.json file.

![](https://www.c-sharpcorner.com/article/create-and-experiment-angular-9-rc-app-without-installing-9-cli/Images/03%20Angular%209%20Package%20structure.PNG)

As I mentioned earlier, I am showcasing an Employee application to benchmark the performance. We can install below node packages into to our application.

-   npm i bootstrap
-   npm i font-awesome
-   npm i angular-in-memory-web-api

For simple migration, I am just copying the src folder files from Angular 8 and paste inside the Angular 9 src folder. But for better understanding about migration and breaking changes from Angular 8 to Angular 9, please refer to official Angular documentation.

If you want to get full details about this Employee application, please refer to below article on C# Corner. I have explained all the steps in this article.

[Localization In Angular 8 Employee App](https://www.c-sharpcorner.com/article/localization-in-angular-8-employee-app/)

We can run both Angular 8 and Angular 9 applications simultaneously and see the resource size and loading time in the network tab.

![](https://www.c-sharpcorner.com/article/create-and-experiment-angular-9-rc-app-without-installing-9-cli/Images/04%20Benchmark%20between%20Angular%208%20and%20Angular%209.png)

You can see the difference. You will get a better performance with new IVY renderer in Angular 9.

We can run the same applications in production mode also.

![](https://www.c-sharpcorner.com/article/create-and-experiment-angular-9-rc-app-without-installing-9-cli/Images/05%20Benchmark%20between%20Angular%208%20and%20Angular%209%20in%20production%20mode.png)

In production mode also you get performance improvement in Angular 9 application. Please note, this is a very simple application with less than ten components. If you are working with an enterprise level application with large number of components and lazy loading modules, I am pretty sure you will get huge performance benefits.

  

## Conclusion

  

In this post, I have explained about the Angular 9 application creation without installing Angular 9 CLI into our local machine. We have used npx command to create new Angular application. Later, we have migrated one Angular 8 application to Angular 9 by simply copying the src folder. I have not made any breaking changes in the existing code. But for better understanding about migration, please refer to official Angular documentation. We have seen a simple performance and resource size benchmark between these two applications. Please try the same technique with your existing Angular 8 applications and send me your valuable feedback.

Next Recommended Article  [Getting Started With Angular 2 Using Angular CLI](https://www.c-sharpcorner.com/article/getting-started-angular-2-using-angular-cli/)