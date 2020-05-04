---
layout: post
title: How to install  Node.js 6 on Ubuntu 15
image: "images/content/how-to-install-node-js-6-on-ubuntu-15/titleimage.png"
excerpt: "In this tutorial we are going to see step by step how we can install Node.js version 6 on Ubuntu 15"
tags : nodejs
---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612764147/"></a>


[Node.js](https://nodejs.org/) is a JavaScript platform that allows developers to use JavaScript to build the server side of web applications so JavaScript developers can leverage their existing skills to build complete web applications without using other languages such as PHP or Python .Thanks to Node.js many tools have been created which are not necessarly web applications but tools to ease development workflows.Building and task automation tools such as Gulp and GruntJS have taken web development to the next level so Node.js is not only required in the server but also on any developer's machine so he can takes advantages of these great tools even if he's not a Node.js web developer.In this small tutoriel guide i will show you my used method to install the latest Node.js platform ,which is when writing this tutorial it's the version 6 ,under Ubuntu 15.

Installing Node.js 6 with NVM  or Node Version Manager
----------------------------------------------------------

First of all ,make sure you have cURL installed and then grab NVM(https://github.com/creationix/nvm) with

	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

Now you can install latest Node.js version using some few commands

First check all available Node.js versions 

	nvm ls-remote 

You can install any version with

	nvm install v6.2.0

Next you need to tell NVM which version to use in any new shell with

	nvm use v6.2.0

Now make v6.2.0 as the default version by executing 

	nvm alias default node

or any other version with 

	nvm alias default v6.1.0 


Conclusion
----------------


That's it folks ,it is really easy to install,update and switch between multiple Node.js versions using Node Version Manager.
Please note that you can also install Node.js using other methods such as using the Ubuntu Package Manager but the drawback of this method is that it dosen't install the latest version but an old version of Node.js 




