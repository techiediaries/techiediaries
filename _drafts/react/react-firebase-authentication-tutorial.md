---
layout: post
title: "React Firebase Authentication Tutorial"
image: "images/content/react.png"
excerpt: "In this tutorial we'll look at how to use React setState()" 
tags : [react]
---

## Setting up a Firebase Project

If you don't already have a Firebase setup, you simply need to head to your [Firebase console](https://console.firebase.google.com/) and click on **Add project** then follow the steps to create a Firebase project.

![Firebase add project](https://www.diigo.com/file/image/rscqpoqzerracpoadzdpsrpbod/Firebase+console.jpg)

Enter a name for your project, accept the terms and click on the blue **Create project** button:

![Create firebase project](https://www.diigo.com/file/image/rscqpoqzerracqdpdzdpsrpbsp/Firebase+console.jpg)

Once your project is created, you need to click on it to go to the admin dashboard for that particular project.

On the dashboard, go to `Develop` > `Authentication` and click on the **Web setup** button. 
![Firebase web setup](https://www.diigo.com/file/image/rscqpoqzerracrddbzdpsrpcdo/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg?k=4b15763837b7fdca262ff25717f2a9a5)

A popup window will be opened that contains your firebase credentials:

![](https://www.diigo.com/file/image/rscqpoqzerracrqdbzdpsrpddq/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Click on the **Copy** button to copy all code with your credentials in your clipboard:

```html
<script src="https://www.gstatic.com/firebasejs/5.7.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  };
  firebase.initializeApp(config);
</script>
```

In our case, we only need to values of the `config` object because we'll be installing Firebase SDK from npm.

Next, you'll need to enable Email authentication from the **authentication > Sign-in** method tab:

![](https://www.diigo.com/file/image/rscqpoqzerrapdrrbzdpssaedo/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

When you click on the **Set up sign-in method** button, you'll be takin to the following tab:

![](https://www.diigo.com/file/image/rscqpoqzerrapeaqqzdpssaeeo/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Click on the Email/Password row and then on **Enable** :

![](https://www.diigo.com/file/image/rscqpoqzerrapecoazdpssaeep/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Finally click on the **Save** button.

One last thing that you need to do from the console is creating a user with email and password that you'll use to login because we will not allow registration from our web application. Only the website admin will be able to access the admin interface to create their portfolio.

Go to the **authentication > Users** tab and click on the **Add user** button:

![](https://www.diigo.com/file/image/rscqpoqzerraqeerrzdpssasso/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Enter your user's credentials and click on the **Add user** button:

![](https://www.diigo.com/file/image/rscqpoqzerraqepbbzdpssbaqb/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)