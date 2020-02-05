# This Dot Labs: Angular app with Contentful CMS

Have you ever wondered how to create an app in Angular using a headless CMS product? After doing a lot of research on multiple CMS products like

-   Contentful
-   CloudCMS
-   ButterCMS
-   MURA CMS

I decided to go with Contentful.

Contentful is content infrastructure. Its platform lets you create, manage and distribute content to any platform. Unlike a CMS, it gives you total freedom to create your own content model so you can decide what content you want to manage. Contentful provides you RESTful APIs so you can deliver your content across multiple channels such as websites, mobile apps (iOS, Android and Windows Phone) or any other platform you can imagine (from Google Glass to infinity). With an uncluttered user interface, Contentful is an efficient tool for creating and managing your content online, either alone or in a team. You can assign custom roles and permissions to team members, add validations depending on the kind of content you have to insert, and add media such as images, documents, sounds or video.

I decided to use Contentful for an Enterprise project for one of the biggest companies in the USA.

A few things I like about Contentful:

-   It allows multiple users.
-   It's easy for the non-technically minded.
-   It streamlines scheduling
-   It improves site maintenance
-   Design changes are simple.
-   It helps you manage content.
-   You're in control.
-   Try for free.
-   Works with multiple frontend technologies like Angular, React, Vue, etc.
-   They have a slack channel
-   Good community support.
-   GraphQL friendly.

Did I mention Contentful is built on top of AWS :)

**This tutorial requires some level of knowledge with Angular.**

# Working with Contentful

1) Create an account with  [Contentful website](https://www.contentful.com/).

2) Create a new free space.  ![Choose space type](https://thepracticaldev.s3.amazonaws.com/i/i5cdfs35h633atndxqsk.png)  3) Enter the new space name E.g  _angular-cms_. 4) Make sure the option  **Create an empty space**  is selected. 5) Click on  **PROCEED TO CONFIRMATION**. 6) Click on  **CONFIRM AND CREATE SPACE**. 7) After your space has been created, at the very top click on  **CONTENT MODEL**. 8) Then click on the blue button  **Add Content Type**. 9) A modal will appear. Enter your content type name as Angular Post .(write down the content type Id, should be angularPost) 10) Click  **CREATE**.  ![Create new content](https://thepracticaldev.s3.amazonaws.com/i/00cpcww77d66t4bhn5dh.png)  11)Time to add some fields. On your right side, click on the blue button  **Add Field**. 12) Create a new field called  **title**  of type TEXT. 13) Create a new field called  **body**  of type TEXT.

_Note: Right below where you enter the name of the field, make sure you select  **Long text, full-text search**._

14) Create a new field called  **image**  of type MEDIA.  _Note: Right below where you enter the name of the field, make sure you select  **One file**._  15) On the top right corner, click the green button  **SAVE**. 16) In the top navigation bar, click on  **CONTENT**. 17) Click the "Add Angular Post". 18) Enter the Title, and Body for your new post. Create at least 2 posts. 19) Now click on  **Create a new asset and link**. 20) A modal will open, enter the name of your asset, description(optional) and select your image file. 21) On the right sidebar, click on  **PUBLISH**. 22) Click the "<" arrow at the top left of the modal to go back to the creation of your post. 23) On the right sidebar, click on  **PUBLISH<**. 24) In the top navigation bar, click on  **SETTINGS/API Keys**. 25) On the right sidebar, click on  **Add API Key**. 26) Copy your Space ID and your Content Delivery API Access Token, save them somewhere. 27) ON the top right corner, click  **SAVE**.

# Connecting Angular with Contentful

_Note: I'm not going to get into best practices with angular, I'm only showing you how to use Contentful with Angular._

1) Create a new Angular app. Select SASS as your CSS compiler, and the option to create the routes file.

```
ng new angular-cms
```

2) Create a new service.

```
ng g s contentful
```

3) Install the Contentful NPM package.

```
npm i --save contentful
```

4) At the top of you contentful.service.ts file, add the following line:

```
import { createClient } from 'contentful';
```

5) Time to use your Space Id and accessToken.

```
 private CONFIG = {
  space: 'ENTER YOUR SPACE ID HERE',
  accessToken: 'ENTER YOUR ACCESS TOKEN HERE',
  contentTypeIds: {
   //The property name angularPost can be whatever
   //what matters in the value which is the content type Id.
   angularPost: 'angularPost'
  }
 };
```

_Note If you didn't save your content type id somewhere, you can get it as follows: contentful->content model -> click your content model name -> right sidebar look for your content type id._

6) Create a new private variable.

```
  private cdaClient = createClient({
    space: this.CONFIG.space,
    accessToken: this.CONFIG.accessToken
  });
```

7) At the top of your file, import  **from**  from RxJs.

```
import { from } from 'rxjs';
```

8) Now let's create a function to retrieve all of our posts.

```
getPosts(query?: object): any {
 return from(
   this.cdaClient.getEntries({
     ...Object,
     content_type: this.CONFIG.contentTypeIds.angularPost,
     query
   })
 ).pipe(map(posts => posts.items));
}
```

9) Time to create a function to retrieve a single post.

```
getPost(id: string): any {
 return from(this.cdaClient.getEntry(id));
}
```

10) Inside of your constructor, let's initialize the our getPosts() method.

```
constructor() {
 this.getPosts();
}
```

11) The contenful.service.ts file should look like this:

[contentful.service.ts](https://github.com/devpato/angular-contentful-cms/blob/master/src/app/contentful.service.ts)

12) Let's create to new 2 components.

```
ng g c posts-page
```

```
ng g c post-details
```

13) Now go to your posts-page component, and enter the following lines of code:

```
import { ContentfulService } from '../contentful.service';
...
posts$ = this.contentfulService.getPosts();
constructor(private contentfulService: ContentfulService) {}
```

14) Your code should look like this:

[posts-page.component.ts](https://github.com/devpato/angular-contentful-cms/blob/master/src/app/posts-page/posts-page.component.ts)

15) Clear your post-page.component.html and paste:

```
<div class="content">
 <div class="posts">
  <ng-container *ngIf="posts$ | async as posts">
   <div *ngFor="let p of posts" class="post">
     <div class="post-image">
       <img src="{{ p.fields.image.fields.file.url }}" />
     </div>
     <a [routerLink]="['/posts/', p.sys.id]">
       <div class="post-title">
         {{ p.fields.title }}
       </div>
     </a>
   </div>
  </ng-container>
 </div>
</div>
```

16) Copy the code from the link listed below, and paste it to your posts-page.components.scss

[posts-page.component.scss](https://github.com/devpato/angular-contentful-cms/blob/master/src/app/posts-page/posts-page.component.scss)

17) Time to go to our post-details.component.ts and add the following:

```
import { ContentfulService } from '../contentful.service';
import { ActivatedRoute } from '@angular/router';
...
id = this.route.snapshot.paramMap.get('id');
post$ = this.contentfulService.getPost(this.id);

constructor(private contentfulService: ContentfulService, private 
route: ActivatedRoute) {}
```

18) Your code should look like this:  [post-details.component.ts](https://github.com/devpato/angular-contentful-cms/blob/master/src/app/post-details/post-details.component.ts)

19) Clear your post-details.component.html and paste:

```
<div class="post-details" *ngIf="post$ | async as post">
 <div class="post">
  <div class="post-header">
   <div class="header--image">
     <img src="  {{ post.fields.image.fields.file.url }}" />
   </div>
   <div class="header--title">
     {{ post.fields.title }}
   </div>
  </div>
  <div class="post-body">
   {{ post.fields.body }}
  </div>
 </div>
</div>
```

20) Copy the code from the link listed below, and paste it to your post-details.components.scss

[post-details.component.scss](https://github.com/devpato/angular-contentful-cms/blob/master/src/app/post-details/post-details.component.scss)

21) Now let's work with the routes. Add the following routes to your app-routing.module.ts

```
const routes: Routes = [
 {
  path: '',
  component: PostsPageComponent
 },
 {
  path: 'posts/:id',
  component: PostsDetailsComponent
 }
];
```

22) Now run your server. You should see something like this:

_Note: the information on the posts may be different. It depends on whatever you entered when creating a new Angular post._  ![screenshot of the newly created app](https://thepracticaldev.s3.amazonaws.com/i/ggs6fxcbufcq4i9qcb4j.png)

23) Click on one of the items, it should take you to its details page.  ![screenshot of the blog page](https://thepracticaldev.s3.amazonaws.com/i/m6s1oqn1r2jf7njn8bpm.png)