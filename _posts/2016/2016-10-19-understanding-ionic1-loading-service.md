---
layout: post
title: "Understanding Ionic 1 Loading Service:$ionicLoading"
image: "images/content/understanding-ionic1-loading-service/titleimage.png"
excerpt: "In this tutorial we are going to see how to use $ionicLoading,a built in Ionic service for displaying a loading status visual feedback to users when your app is executing some async operation(s)"
tags : ionic 
---
{% include image.html
       img="images/content/understanding-ionic1-loading-service/bigimage.png"
       title="Understanding Ionic 1 Loading Service:$ionicLoading"
%}

I really love working with Ionic,to build cross platform mobile applications with web technologies,because it provides developers with ready to use features and building blocks to rapidly build apps.
In this tutorial we are going to see how we can use [Ionic Loading service](http://ionicframework.com/docs/api/service/$ionicLoading/) ,which is a very useful functionality needed by every mobile app ,to show a loading feedback to your app users until some task is finished ,the most used case happens when the app is getting data from a server so instead of giving no feedback to the user this service shows a loading status until requested data is completly received .

So imagine you are making a request to some HTTP server ,depending on your network and requested data this operation can either take no significant time ,in such as case the user notices nothing or it can take some time (short or long depending on network conditions) in this case it is better to give to the user some feedback such as data is loading or please wait until we receive data .Lets suppose you are writing this controller :

		.controller('ListController', function($scope,DataService) {
		    
		    $scope.data = [];
		    
		    $scope.get = function() {
		        
		        DataService.get().then(function(data) {
		            
		            $scope.data = data;
		        
		        });
		    }
		    
		})	

The get function can be attached to a button

		<button ng-click="get()" >Get Data</button>		

You really don't need to know anything about the implementation details of DataService except for the fact that it returns a promise which takes some time to finish its job.

If DataService takes a long time the user will have no visual feedback so he might think something is wrong and if he is impatient he could also try to execute the action multiple times resulting ,for example,in multiple ajax calls(if the data service is doing ajax calls which's the common thing).


Adding visual feedback 
---------------------------

Now lets try to rewrite our controller so we can add some visual feedback to the user when the data service is taking its time .Thanks to Ionic it's really easy to do that we just need to inject the built in service $ionicLoading 

		.controller('ListController', function($scope,DataService,$ionicLoading) {
		    
		    $scope.data = [];
		    
		    $scope.get = function() {
		        
		        $ionicLoading.show();
		        DataService.get().then(function(data) {
		            
		            $scope.data = data;
		            $ionicLoading.hide();
		        
		        });

		    }
		    
		})	

So as you can see with two lines we have added an important functionality which otherwise can result in a lot of misunderstanding between you app and its users.In three steps 

We first inject the service 

then we show the visual feedback to the user  with $ionicLaoding.show() method	when get() function is invoked (when the user clicks on the button).

Last when the promise returns we hide the loading status with $ionicLoading.hide() method.

$ionicLoading shows a loading animation by default but it's also possible to customize the visual feedback by using a custom template ,simply by 
	
	$ionicLoading.show({
	    template: '<ion-spinner icon="spiral"></ion-spinner>',
	});

Or you can specify an html template using templateUrl :

    $ionicLoading.show({
      templateUrl:"loading.html"
    });

$ionicLading side effects and how to handle them
------------------------------------------------------

So as we said before,notifying users of what's going on when you are app is busy doing some async operation is very crucial for a good user experience ,and that's very easy to achieve using the $ionicLaoding service but ,if not handled properly,it can also damage the user experience of your app.Let me explain,imagine a situation when app is loading some data and $ionicLoading is displaying the loading animation but suddenly the network connexion is lost ,the loading animation will go on infinitly preventing the user from intracting with the app ui until you close it or the network connexion comes back which can be annoying to most users so how to solve this side effect of using $ionicLoading ?

That's also very easy to do ,all you have to make is some customization to $ionicLoading default template ,basically you need to add a close button to the loading template so if the user decides to get rid of the loading status,and get back to the normal user interface so he can use the app,he needs just to click on close button .Lets modify our controller code    

		.controller('ListController', function($scope,DataService,$ionicLoading) {
		    
		    $scope.data = [];

		    $scope.stopLoading = function(){
		    	$ionicLoading.hide();
		    }
		    $scope.get = function() {
		        
		        $ionicLoading.show({
		        	 templateUrl: 'templates/loading.html',
      				 scope: $scope
		        });
		        DataService.get().then(function(data) {
		            
		            $scope.data = data;
		            $ionicLoading.hide();
		        
		        });

		    }
		    
		})

Now on your custom template add a close button and bind it to stopLoading() function

		<ion-spinner icon="spiral" ng-click="stopLoading()"></ion-spinner>


That's it,an easy workaround which offers a better experience to your app users .


Conclusion
---------------

That's all for this short post.Remember you need always to add visual feedback,to your app users,for a better user experience even in cases when you don't think that an aync operation won't take so much time to execute.that's because apps run in different situations and conditions.    