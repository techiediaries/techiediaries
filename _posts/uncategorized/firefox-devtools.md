Please note that this article describes DevTools shipped with the latest version of Firefox at the time of this writing which's Firefox 57 or Firefox Quantum, it has a new [Photon UI](http://design.firefox.com/photon/welcome.html) so differences may exist if you still use previous versions of Firefox.

Since performance is correlated to timing metrics that are either related to load-time or run-time, Firefox DevTools has two important tools specifically designed to give developers insights into the work the browser is doing to load and render a web page. 

* The Network tool can help developers identify resources that take longer times to load or have big size bundles etc. 

* The Performance tool can help developers find slow JavaScript code or slow CSS animations etc. 


## The Core Tools of Firefox Web Developer Tools

Firefox Developer Tools has many tools but there are 7 core tools so let's go over them one by one, focusing on performance related tools.

### Inspector

The Inspector tool allows you to visualize the DOM of the current web page and inspect each element. You can also add content and change CSS properties of the page elements but all updates are cancelled once you reload the page. 

What you can do in this tool if concerned about performance? Nothing specific but you can have a live visualization of your page DOM and CSS so you can eliminate unnecessary elements to optimize the DOM layout which results in less-time when the browser is rendering the page.    

### The Web Console

The Web Console allows you to debug your JavaScript code for errors but can also help you optimize the performance's aspects of your application at code level by offering a rich API that can be called from your code which sends the output to the Web Console. 

The Console API for Firefox is based on a [living specification](https://console.spec.whatwg.org/)  implemented by major browsers such as Chrome and Edge. We have previously covered the Console API in details in this [Chrome DevTools's post](). 
   
### Debugger

The Firefox Debugger tool gives web developers the opportunity to examine and modify your JavaScript code. It can also be used to identify bugs. Using the Debugger, you can debug code locally in Firefox, or remotely on a Firefox OS device or Firefox for Android.

### Style Editor

The Style Editor enables you to:
   view and edit all the stylesheets associated with a page
    create new stylesheets from scratch and apply them to the page
    import existing stylesheets and apply them to the page

### Storage Inspector
The Storage Inspector enables you to inspect various types of storage that a web page can use.Cache Storage, Local Storage and Session storage etc. 