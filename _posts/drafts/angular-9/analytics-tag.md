If you want to know about the basics of Google Tag Manager and it’s components, head to  [this Google Page](https://support.google.com/tagmanager/answer/6103657).

# **Create a Google Tag Manager instance**

First, go to  [https://tagmanager.google.com/](https://tagmanager.google.com/)  and log in with your google account or sign up. You should then be directed to the  **“All Accounts”**  page. In the top right corner you find a button  **“Create Account”**. Click it and start setting up Google Tag Manager.

Fill in the account details and for  **“Target Platform”**  choose  **Web**  as you will to implement the Tag Manager into an Angular web and mobile application. After that you’ll be shown a popup with instructions to paste code into your application.

![](https://miro.medium.com/max/60/1*Uj-FkXVQRxjiwfQ0mUkG5w.png?q=20)

![](https://miro.medium.com/max/1468/1*Uj-FkXVQRxjiwfQ0mUkG5w.png)

Copy the codes and insert them into your index.html as described.

So head to your Angular project and find the  _index.html_  which is usually located under  _src_  folder.

# **Setup Google Analytics with Google Tag Manager**

In Tag Manager, select  **“Variables”**  from the sidebar and add a new  **“User-Defined Variable”**. From the list of Variable Configurations select  **“Google Analytics settings”**. Now you should head to Google Analytics  [https://analytics.google.com/](https://analytics.google.com/)  and add a new Analytics Property. After setting it up, copy the Tracking ID which usually starts with “UA-”. Go back to Tag Manager and paste this id into the variable configuration of Google Analytics settings.

# Configure Google Tag Manager

An important setting to do is to anonymize the IP. Therefore expand the section  **“More Settings”**  and click on  **“Fields to set”**. Add a new field and choose anonymizeIp and set the value to “true”. This is needed for the GDPR compliance in EU. Now, save your custom variable.

![](https://miro.medium.com/max/60/1*n6XVCBykDGyGZcaIU3MbZw.png?q=20)

![](https://miro.medium.com/max/1844/1*n6XVCBykDGyGZcaIU3MbZw.png)

Variable Configuration for Google Analytics in Tag Manager

Add a second  **“User-Defined Variable”** to store the cookie name and select the variable type  **“1st-Party Cookie”**.  As a cookie name write something like “cookieconsent”. Set “Cookie Consent” as a name for the variable and save it.

Next, go to the page  **“Triggers”** and create a new one. This prepares the trigger to enable Google Analytics only if the user accepted all cookies.

For  **“Trigger Configuration”**  select  **“Page View”**  as a trigger type. Here, it’s important to restrict it to  **“Some Page Views”**  and that opens a new line with trigger adjustments. Select **“Cookie Consent”** and  **“contains”**  as trigger conditions. Google Analytics should only trigger if the user allowed these cookies. Hence, paste “_allow_” as a value here and keep that value in mind. We’ll need it once we head back to our Angular project. Save this trigger with a meaningful name (such as cookie-consent-pages) and navigate to Tags.

![](https://miro.medium.com/max/60/1*MHcx_0toKikWyV38OmoCqg.png?q=20)

![](https://miro.medium.com/max/2176/1*MHcx_0toKikWyV38OmoCqg.png)

## Create the Tag for Google Analytics

Add a new tag and for  **“Tag Configuration”**  use  **“Google Analytics: Universal Analytics”**. The  **“Track Type”**  is  **“Page View”**  and the  **“Settings”**  are to be selected from the previously added  **“Google Analytics Settings”**  Variable. As a trigger, select  **“cookie-consent-pages”**  because it’s important to restrict it to the dependency to the accepted cookies for the GDPR compliance.

![](https://miro.medium.com/max/60/1*_xcqPQSTY33Wk4fujd86qA.png?q=20)

![](https://miro.medium.com/max/2632/1*_xcqPQSTY33Wk4fujd86qA.png)

Final configuration for the Google Analytics Tag

And that’s it, save your Tag and submit your workspace changes in the upper right corner by pressing  **“Submit”**. It opens an overlay to add publishing information. Again, add some meaningful title and description here.

Your Google Tag Manager is perfectly set up! Head back to your Angular Code now.

----------

# Implement the Tag Manager on Angular code base

As already mentioned in the first step, your JavaScript Code for the Tag Manager should be in the  _index.html_  of your Angular project.  
Now the calls for the Tag Manager are added in case the user accepts the cookie and Google Analytics is allowed to track.

## What exactly is needed?

1. Add some kind of cookie banner to show to the user when he first enters the page with some text.

2. The banner should have a button like “OKAY” to accept the cookie. This button has to trigger the Tag Manager and updates the value of the cookie-consent setting.

3. Add an option to opt-out from tracking on a privacy policy page.

Let’s jump into the code.

## Cookie Banner

Create a new component from your terminal:  `$ npm run ng g c cookie-banner  
`Implement it in your  _app.component.html_ somewhere above your closing wrapper tag:

<app-cookie-banner></app-cookie-banner>

Add some HTML in  _cookie-banner.component.html_  with a text, a link to your privacy policy page and a button. For example:

<div  _*ngIf_="showBanner">  
<p>  
For continuous improvement of user experience this website uses cookies for collecting your IP address and individual statistics.  
<br>  
See my <a routerLink="/legal/dataprivacy">data protection guideline</a> for further information and opt-out.  
By clicking OK you agree to share your data.  
</p>

<button (click)="agreeToShare()">OK</button>  
</div>

Heading to the  _cookie-banner.component.ts,_  the following functionalities are needed:  
- some basic JavaScript code for checking and creating cookies  
- a check for returning users to not show the banner again.

Prepare your app.module.ts for using the document and window. In  **provider**  section add:

{  
provide: 'window',  
useValue: window,  
},  
{  
provide: 'document',  
useValue: document,  
}

Then, in the  _cookie-banner.component.ts_, inject the window and document:

public constructor(@Inject('document') private document,  
@Inject('window') private window) {  
}

The first function checks if the cookie with the passed name is present and the second function creates a cookie with the parameters for name, value and expiration days.

private getCookie(cname) {  
const name = cname + '=';  
const ca = document.cookie.split(';');  
for (let i = 0; i < ca.length; i++) {  
let c = ca[i];  
while (c.charAt(0) === ' ') {  
c = c.substring(1);  
}  
if (c.indexOf(name) === 0) {  
return c.substring(name.length, c.length);  
}  
}  
return '';  
}private setCookie(cname, cvalue, exdays) {  
const d = new Date();  
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));  
const expires = 'expires=' + d.toUTCString();  
this.document.cookie = cname + '=' + cvalue + ';' + expires;  
}

You need to implement the check on component initialization if the user has already seen the banner. Add a new property to  _cookie-banner.component.ts_  `public showBanner: boolean;`

public ngOnInit() {  
const consent = this.getCookie('cookieconsent');  
if (consent === 'allow') {  
this.showBanner = false;  
} else {  
this.showBanner = true;  
}  
}

## Button to agree on cookies

To implement the logic (in  _cookie-banner.component.ts_) for setting the cookie if the user clicks the button, the HTML is already prepared with a click function. It’s easy to just add the cookie now and reload the page. The page needs to reload to already track the current session. Otherwise it would only track when the user returns to the page.

public agreeToShare() {  
this.setCookie('cookieconsent', 'allow', 365);  
this.window.location.reload();  
}

The passed name of the cookie now has to be the same as used in the Tag Manager in the Cookie Consent variable. In this tutorial I named it “cookieconsent”. As you can see, the function is called with the previously added value “allow” for the Tag Manager. Here, 365 days are set as an expiration date but feel free to set your own value.

Well, that’s it for the logic to set the cookies and values for the Tag Manager. Now, update your privacy policy to add an option for the user to opt-out. I won’t go into details about the whole privacy policy page.

## Opt-Out Option

Somewhere on the privacy policy page (for example  _privacy-policy.component.html_), a button is needed to create an opt-out option. I placed this below the paragraph about my usage of Google Analytics.

<button (click)="removeCookie()">Revoke Analytics Cookie Usage</button>

Here again, inject the document and window:

constructor(@Inject('document') private document,  
@Inject('window') private window) {  
}

The function in  _privacy-policy.component.ts_  for this button is super simple:

public removeCookie() {  
this.document.cookie = 'cookieconsent= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';  
this.window.location.reload();  
}

This basically sets the cookie for the consent to an empty value which then is not “allow” once the user comes back. And again, the page needs to reload to already stop tracking here.

# And that’s it!

Once you click on the button of your cookie banner, inspect your page and navigate to  **Application > Cookies**. You should see your cookie with the value “allow.”

![](https://miro.medium.com/max/60/1*pwoFjUapoLB0sI32RMTKuw.jpeg?q=20)

![](https://miro.medium.com/max/815/1*pwoFjUapoLB0sI32RMTKuw.jpeg)

Now you can start tracking your visitors. 👏

> In case you want to trigger all page views on sub routes, you need to add them manually as a typical Angular page is a single-page-application and cannot transmit route changes automatically.