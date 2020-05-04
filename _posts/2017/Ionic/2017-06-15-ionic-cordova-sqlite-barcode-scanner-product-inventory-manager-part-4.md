---
layout: bpost
title: "Ionic 5+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 4]"
image: "images/content/inventory-manager-ionic-sqlite.png"
excerpt: "Using Ionic 5+ with Cordova SQLite and Barcode scanner to build a simple real world product inventory manager mobile application for Android and iOS :part 4" 
date: 2020-05-03
tags: ionic
---

{% include image.html 
    img="images/content/inventory-manager-ionic-sqlite.png" 
    title="Ionic 5+ SQLite and barcode scanner " 
%}

This is PART 4 of these series of tutorials to learn Ionic 5+ building a real world application which can be 
used by a small business to manage the inventory of products .

These series of tutorials demonstrate the use of two Cordova and Ionic Native 3.x+ plugins for accessing native 
features of mobile devices : The SQLite plugin and the Barcode scanner plugin .

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager" target="_blank">
Ionic 5+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 1]
</a>

<a href="/mocking-native-sqlite-plugin"  target="_blank">How to Mock the SQLite Plugin to Develop Your App Entirely On the Browser</a>

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-2" target="_blank">
Ionic 5+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 2]
</a>

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-3" target="_blank">
Ionic 5+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 3]
</a>

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-4" target="_blank">
Ionic 5+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 4]
</a>

On the previous part we covered how to add pagination to our data service provider .

In this part we are going to start building our first page or the home page which contains buttons to 
navigate to different pages of the app .

But first lets do some bit of customization .

On the first part we have generated different pages (products ,families ,locations and transactions )
using the Ionic CLI .If you are still using Ionic 5 version then you don't have anything but if you are 
using Ionic 3 you need to modify the generated pages so they don't use lazy loading because it will cause 
some problems with custom components we are going to create later in this tutorial .

How to disable lazy loading for pages ?

In Ionic 3 ,pages which use lazy loading have their own modules in the same folder where they exist .They are 
also decorated with @IonicPage() decorator so to disable lazy loading .

Delete the page own module which has a name like : xxxx.module.ts 

Remove the IonicPage() decorator  .

Now you need to add these pages to the app main module :

Go to <em>src/app/app.module.ts</em> .Import the pages :

    import { FamilyListPage } from '../pages/family-list/family-list';
    import {FamilyDetailsPage} from '../pages/family-details/family-details';

    import { LocationDetailsPage } from '../pages/location-details/location-details';
    import { LocationListPage } from '../pages/location-list/location-list';

    import { ProductDetailsPage } from '../pages/product-details/product-details';
    import { ProductListPage } from '../pages/product-list/product-list';

    import { TransactionListPage } from '../pages/transaction-list/transaction-list';
    import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';


Then add them to imports and entryComponents arrays :

    @NgModule({
    declarations: [
        MyApp,
        FamilyListPage ,
        FamilyDetailsPage,
        LocationDetailsPage,
        LocationListPage,
        ProductDetailsPage,
        ProductListPage,
        TransactionListPage,
        TransactionDetailsPage
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        FamilyListPage,
        FamilyDetailsPage,
        LocationDetailsPage,
        LocationListPage,
        ProductDetailsPage,
        ProductListPage,
        TransactionListPage,
        TransactionDetailsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: SQLite ,useClass:SQLiteMock},
        DataServiceProvider

    ]
    })
    export class AppModule {}


You can do the same with the home page or not .Since it has no interaction with custom components we are going 
to build later in this tutorial ,It doesn't produce any problems !

Now we are ready to continue building our mobile application .

Open <em>src/pages/home/home.ts</em> and add :

    import { Component } from '@angular/core';
    
    import { IonicPage , ModalController } from 'ionic-angular';
    
    import {FamilyListPage} from '../family-list/family-list';
    
    import {LocationListPage} from '../location-list/location-list';
    
    import {ProductListPage} from '../product-list/product-list';

    import { TransactionListPage } from '../transaction-list/transaction-list';

    @IonicPage()
    @Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    })
    export class HomePage {
    familyListPage = FamilyListPage; 
    locationListPage = LocationListPage;
    productListPage = ProductListPage;
    transactionListPage = TransactionListPage;

    constructor(public modalCtrl : ModalController ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    openModal(page){
        switch(page){
        case 'FamilyListPage':
            this.modalCtrl.create(this.familyListPage).present();
            break;
        case 'LocationListPage':
            this.modalCtrl.create(this.locationListPage).present();
            break;
        case 'ProductListPage':
            this.modalCtrl.create(this.productListPage).present();
            break;
        case 'TransactionListPage':
            this.modalCtrl.create(this.transactionListPage).present();
            break;
            
        }
        
    }
    }
 
We import and inject ModalController to create and show modal pages .

We import different list pages (we are not using lazy loading so we can't reference pages by their names instead we need to 
import their components ) then we add an openModal(page) method which creates and presents a modal for 
the page we pass as parameter .

Open <em>src/pages/home/home.html</em> then add :

    <ion-header>
    <ion-navbar>
        <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Product Inventory Manager</ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content>
        <ion-content padding>
        <ion-list>
        <ion-item>
            <button ion-button (click)="openModal('FamilyListPage')" full>MANAGE FAMILIES</button>
        </ion-item>
        
        <ion-item>
            <button ion-button (click)="openModal('LocationListPage')" full>MANAGE LOCATIONS</button>
        </ion-item>

        <ion-item>
            <button ion-button (click)="openModal('ProductListPage')" full>MANAGE PRODUCTS</button>
        </ion-item>

        <ion-item>
            <button ion-button (click)="openModal('TransactionListPage')" full>MANAGE TRANSACTIONS</button>
        </ion-item>
        
        </ion-list>
        </ion-content>  
    </ion-content>

You should now be able to click on each button to open a modal for the corresponding page .

Implementing List Pages (FamilyListPage - LocationListPage - ProductListPage - TransactionListPage)
------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------

You can either create code that list data for each page or we can do better .We are going to create 
a custom smart list that can list diffrent types of data based on @Inputs 

<h3>Building a Custom Smart List for Showing SQLite Tables Data </h3>

First start by generating a custom Angular component using the Ionic CLI :

    ionic g component SmartList 

A components folder will be created with a sub folder smart-list which contains the component files .

If the component is generated with its own module for lazy loading .Start by removing it then import the 
component in <em>src/app/app.module.ts</em> and add it to declarations and entryComponents array in main app module 

    import { SmartListComponent } from '../components/smart-list/smart-list';

    @NgModule({
    declarations: [
        MyApp,
        SmartListComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SmartListComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: SQLite ,useClass:SQLiteMock},
        DataServiceProvider

    ]
    })
    export class AppModule {}

Now lets implement our smart list :

Open <em>src/components/smart-list/smart-list.html</em> and add :

    <ion-header>
        <ion-navbar>
            <ion-title>{{pageTitle}}</ion-title>
            <ion-buttons end>
            <button ion-button (click)="openAddModal()">Add</button>
            <button ion-button (click)="closeModal()">Close</button>
            </ion-buttons>
        </ion-navbar>
    </ion-header>

    <ion-content padding>
        <ion-list>
            
            <ion-item *ngFor="let item of items" >
            
            <button ion-button (click)="removeItem($event, item)"  item-left icon-only>
                <ion-icon name="remove-circle"></ion-icon>
            </button>
            
            <h2 item-left>
                {{item.name || item.title || item.comment }}
            </h2>

            <p item-right>{{item.id}}</p>
            <h3 *ngIf="item.date">{{item.date}}</h3>
            <button (click)="openViewModal($event,item)" ion-button clear item-end>View</button>
            <button *ngIf="isSelectable" (click)="selectItem($event,item)" ion-button clear item-end>
                Select
            </button>
            </ion-item>
        
        </ion-list>

    </ion-content>

Open <em>src/components/smart-list/smart-list.ts</em> and add :

import { Component , Input , Output , OnInit , OnChanges , EventEmitter } from '@angular/core';
import {  ViewController   } from 'ionic-angular';
import { DataServiceProvider  ,Pager } from '../../providers/data-service/data-service';

@Component({
  selector: 'smart-list',
  templateUrl: 'smart-list.html'
})
export class SmartListComponent implements OnInit , OnChanges {

  
    @Input() public tableName :string  ;
    @Input("pageTitle") pageTitle ;
    @Input("detailsPageName") detailsPageName; 
    @Input("isSelectable") isSelectable : boolean = false; 
    @Input("needsRefresh") needsRefresh : boolean = false;
    
    @Output("onAdd") addHandler = new EventEmitter() ;
    @Output("onView") viewHandler = new EventEmitter<any>() ;
    
    items : Array<Object> ;
    pager : Pager;
    selected : any;
    constructor(private viewCtrl : ViewController , public dataService : DataServiceProvider) {
    }
    public closeModal(){
        this.viewCtrl.dismiss();
    }
    public selectItem(e,item){
        this.viewCtrl.dismiss(item);
    }    
    removeItem(e,item){
        //console.log("remove item from " + this.tableName);
        this.dataService.remove(this.tableName,item).then((r)=>{
        this.fetchData();
        })
    }
    ngOnChanges(){
        console.log("listing " + this.tableName);
        if(this.needsRefresh)
        {
            this.fetchData();
        }
        
    }

    ngOnInit(){
        console.log("listing " + this.tableName);
        this.fetchData();
    }
    fetchData(){
        this.dataService.list(this.tableName).then((o)=>{
        this.pager = <Pager>o;
        this.pager.initialPage().then((oo : Array<Object>)=>{
            this.items = oo;
            console.log(JSON.stringify(this.items));
        });

        })
    }

    public openAddModal(){
        this.addHandler.emit();
    }

    public openViewModal(e,item){
        this.viewHandler.emit(item);
    }
    }


The custom component takes 4 @Inputs for configuration 

The SQLite Table Name from where to fetch data :

  @Input() public tableName :string  ;
  
The title to show on the page :

  @Input("pageTitle") pageTitle ;

The name of the corresponding details page :

  @Input("detailsPageName") detailsPageName; 

A boolean based on which we dispaly a select button on the list :

  @Input("isSelectable") isSelectable : boolean = false; 

A boolean based on which we tell the component we need to refresh its display :

  @Input("needsRefresh") needsRefresh : boolean = false;


The component has two @Outputs  or events 

This custom event is fired by the component when we click on the add button of the page 

    @Output("onAdd") addHandler = new EventEmitter() ;

This custom event is fired by the component is fired when we click on the view button of list items :

    @Output("onView") viewHandler = new EventEmitter<any>() ;

The component also declares two variables :

items : Array<Object> which holds the items to display by the list 

pager : Pager which is the pager object that can be used to fetch paginated data for the SQLite database .


The fetchData() method is used to get the pager object returned from the list method of injected DataService 
and then fetch the first page data and assign the page rows to items array :

    fetchData(){
        this.dataService.list(this.tableName).then((o)=>{
        this.pager = <Pager>o;
        this.pager.initialPage().then((oo : Array<Object>)=>{
            this.items = oo;
            console.log(JSON.stringify(this.items));
        });

        })
    } 

The component implements two life cycle hooks ngOnInit and ngOnChanges .

On Init  we call fetchData() for the first time .

On Changes we check the needsRefresh variable .If it's true we call fetchData again to refresh data .

The closeModal() method closes the current modal by using the .dismiss() method of injected ViewController .

    public closeModal(){
        this.viewCtrl.dismiss();
    }

The removeItem() removes an item from SQLite table using remove method of injected DataServiceProvider then 
call fetchData() to refresh data .

    removeItem(e,item){
        //console.log("remove item from " + this.tableName);
        this.dataService.remove(this.tableName,item).then((r)=>{
        this.fetchData();
        })
    }    


openAddModal() method emits an addHandler custom event to parent component .This method is called when we 
click on the Add button .

    public openAddModal(){
        this.addHandler.emit();
    }

openViewModal() method emits an viewHandler custom event ,with the corresponding item as parameter ,to parent component .This method is called when 
we click the View button of each list item .


    public openViewModal(e,item){
        this.viewHandler.emit(item);
    }   

<h3>Adding Infinite Scroll to Our Smart List</h3>

So far the list can display data of the first page from a specified table but if we have more data rows how 
can we tell the component to fetch the next pages and display them ?

We can use the Ionic Infinite Scroll Component .

Open <em>src/components/smart-list/smart-list.html</em> then add to the bottom of the ion-content:

    <ion-content padding>
    <ion-list>
        <! --- -->
    </ion-list>
    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>

    </ion-content>

Next on <em>src/components/smart-list/smart-list.ts</em> add doInfinite() method :

    public doInfinite(infiniteScroll:any) {
            
            console.log("Going infinite");
            this.pager.nextPage().then((oo : Array<Object>)=>{
        
            for(let i = 0;i < oo.length ; i++)
            {
                this.items.push(oo[i]);
            }
            infiniteScroll.complete();
        
        })     
    }

So when the user arrives at the bottom of the screen doInfinite() gets called which calls our pager 
nextPage() method and append the page rows to the items array .

Now lets see how to use our Smart List to display paginated data from SQLite tables in our pages .

<h3>Implementing FamilyListPage </h3>

Open <em>src/pages/family-list/family-list.html</em> delete everything then add :

    <smart-list 
        pageTitle="Families" 
        tableName="families" 
        (onAdd)="openAddModal()" 
        (onView)="viewItem($event)" 
        [isSelectable]="isSelectable" 
        [needsRefresh]="needsRefresh">
    </smart-list>

Now we need to add an implementation for openAddModal() and viewItem() methods which get called when the two 
custom events are fired.

We also need to add two member variables isSelectable and needsRefresh .

So open <em>src/pages/family-list/family-list.ts</em>

    import { Component } from '@angular/core';
    import { NavController, NavParams , ModalController } from 'ionic-angular';
    import { FamilyDetailsPage } from '../family-details/family-details';

    @Component({
    selector: 'page-family-list',
    templateUrl: 'family-list.html',
    })
    export class FamilyListPage {

    isSelectable : boolean = false;
    needsRefresh : boolean = false;
    
    constructor(public modalCtrl : ModalController ,  public navParams : NavParams) {
        this.isSelectable = this.navParams.get("isSelectable") || false;
    }

    public openAddModal(){
        this.needsRefresh = false;
        let modal  = this.modalCtrl.create(FamilyDetailsPage);
        modal.onDidDismiss((data)=>{
            this.needsRefresh = true;
        });
        modal.present();  
    }  

    public viewItem(e){
        console.log(e);
        this.needsRefresh = false;
        let modal  = this.modalCtrl.create(FamilyDetailsPage , {item : e});
        modal.onDidDismiss((data)=>{
            this.needsRefresh = true;
        });
        modal.present();        
    }

    }


the viewItem() method creates and present a modal for family details page and pass item to view or edit as parameter 
to the page .After dismissing the modal we need to refresh the smart list data because the user may edit the 
item .Actually this method needs some tweaking to only refresh data only when the user has modified the item .

Why do we need to set needsRefresh to false prior to create the modal ?

That's because we might have needsRefresh set to true if ,for example , have opened the view/edit modal twice .
So we need to always re-set needsRefresh to false in order to trigger change detection for the component .

The openAddModal() method creates and open a family details modal page to add a family item .After dismissing 
the modal we also need to refresh list data so we set needsRefresh to true .This method also needs some more 
tweaking since the user may dismiss the modal without actually adding any item ,in this case we don't 
have to trigger change life cycle hook of smart component since no data is added .

<h3>Implementing LocationListPage </h3>

Like the FamilyListPage we can do the same with the LocationListPage .

So open <em>src/pages/location-list/location-list.html</em>

    <smart-list 
        pageTitle="Locations" 
        tableName="locations" 
        (onAdd)="openAddModal()"  
        (onView)="viewItem($event)" 
        [isSelectable]="isSelectable" 
        [needsRefresh]="needsRefresh">
    </smart-list>

For LocationListpage.ts It has the same implementation as FamilyListPage .You just need to swap 

    let modal  = this.modalCtrl.create(FamilyDetailsPage);

with

    let modal  = this.modalCtrl.create(LocationDetailsPage);

And of course importing LocationListpage instead of FamilyListPage :

    import { LocationDetailsPage } from '../location-details/location-details';

For ProductListPage add 

    <smart-list 
        pageTitle="Products" 
        tableName="products" 
        (onAdd)="openAddModal()" 
        (onView)="viewItem($event)" 
        [isSelectable]="isSelectable" 
        [needsRefresh]="needsRefresh" >
    </smart-list>

For TransactionListPage add 

    <smart-list 
        pageTitle="Transactions" 
        tableName="transactions" 
        (onAdd)="openAddModal()" 
        (onView)="viewItem($event)" 
        [isSelectable]="isSelectable" 
        [needsRefresh]="needsRefresh">
    </smart-list>

Conclusion 
---------------------
---------------------

We have implemented different list pages for our products ,families ,locations and transactions .

On the next tutorial part we are going to see how to implement details pages for the same tables so we can 
add ,view and modify items 

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-5" target="_blank">
Ionic 5+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 5]
</a>




