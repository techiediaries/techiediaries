This post will explain how to set a default route in angular 2/4/5/6. when we work with angular, all we need to set some sort of default page  it can be login page or simply home page depending up on the requirement . so in this post you will learn how to set any page as default ..

Before going in to this post you should configure route settings.   

Below is the Sample code snippet to set routes when you don't specify any path that means if you leave the path empty and set component to your desired component then that will be set as your default page .

import { HomeComponent} from 'homeComponentPath';
const appRoutes: Routes = [
  { path: '', component: HomeComponent }
];