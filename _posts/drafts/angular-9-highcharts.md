How to use Highcharts in Angular?
 By Hardik Savani |  January 17, 2020 |  Category : Angular


Today, this article will help you creating simple example of angular highcharts. i written step by step tutorial of how to use angular highcharts. you can easily create bar chart, line chat, geo chart etc with highcharts angular.

You can easily create chart using highcharts with angular 6, angular 7, angular 8 and angular 9 application.

I will give you very simple example of how we can use highcharts with angular application. we need to install highcharts and highcharts-angular npm package for creating chart using highcharts angular.

So, let's see very simple step and get it very simple example here:



Step 1: Create New App

You can easily create your angular app using bellow command:

ng new myHighcharts

Step 2: Install Npm Packages

In this step, we will install highcharts and highcharts-angular npm package for creating chart using highcharts angular. so let's run both command:

npm install highcharts --save

npm install highcharts-angular --save

Read Also: Angular Change Date Format in Component Example
Step 3: Import HighchartsChartComponent

Now, here we will import HighchartsChartComponent from highcharts-angular and then we add on declarations part. so let's update app.module.ts file as like bellow:

src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
   
import { AppComponent } from './app.component';
   
@NgModule({
  declarations: [
    AppComponent,
    HighchartsChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
Step 4: Use Highcharts

Here, we will update app.component.ts file here, in this file we will create data json array and pass to highcharts option variable.

You can also use services for getting dynamic data using api. you can see example here for creating services if you want: How to create new service in Angular?.

You can update as bellow app.component.ts file.

src/app/app.component.ts

import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
   
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'myHighchart';
   
    data = [{
            name: 'ItSolutionStuff.com',
            data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
         },{
            name: 'Nicesnippets.com',
            data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
         }];
   
    highcharts = Highcharts;
    chartOptions = {   
      chart: {
         type: "spline"
      },
      title: {
         text: "Monthly Site Visitor"
      },
      xAxis:{
         categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yAxis: {          
         title:{
            text:"Visitors"
         } 
      },
      series: this.data
    };
}
Step 5: Display Highcharts

Here, we will update html file as like bellow, so update it as like bellow:

src/app/app.component.html

<h1>Angular Highcharts Example - ItSolutionStuff.com</h1>
   
<highcharts-chart
   [Highcharts] = "highcharts" 
   [options] = "chartOptions" 
   style = "width: 100%; height: 400px; display: block;">
</highcharts-chart>
Now you can run angular app:

Run Angular App:

Read Also: Angular Image Upload Example Tutorial
ng serve

I hope it can help you...