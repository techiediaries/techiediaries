---
layout: bpost
title: "Bootstrap 5 Close Button by Example"
image: "images/content/bootstrap.png"
excerpt: "Bootstrap 5 comes with a new component that can be used to add a close button for dismissing other dismissable components such as popovers, modals and alerts"
date: 2020-09-08
tags : [css, bootstrap, javascript]
---

Bootstrap 5 comes with a new component that can be used to add a close button for dismissing other dismissable components such as popovers, modals and alerts. 

You need to include the `bootstrap.js` file for this component to work.

> **Note**: In our previous [Bootstrap 5 tutorial](https://www.techiediaries.com/bootstrap-5-sass-gulp-4-tutorial-example/), we've set up an environment for Bootstrap 5 development using Gulp 4 and Sass.


```html
<!DOCTYPE html> 
<html> 
	<head> 
		<title> 
			Bootstrap 5 Close Button Example 
		</title> 

		<!-- Load Bootstrap -->
		<link rel="stylesheet"
			href= 
"https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
			integrity= 
"sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
			crossorigin="anonymous" /> 
		<script src= 
"https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
				integrity= 
"sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
				crossorigin="anonymous"> 
	</script> 
		<script src= 
"https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
				integrity= 
"sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
				crossorigin="anonymous"> 
	</script> 
	</head> 

	<body> 
		<div class="container mt-3">  
			Close icon 
			<button type="button"
					class="close"
					aria-label="Close"> 
				<span aria-hidden="true">×</span> 
			</button> 
			<br /> 

			Disabled Close icon 
			<button type="button"
					class="close"
					aria-label="Close"
					disabled> 
				<span aria-hidden="true">×</span> 
			</button> 
		</div> 
	</body> 
</html> 
```


## Conclusion

Bootstrap is a popular, open-source framework that provides pre-built components, and allows web designers and developers of all skill levels to quickly build responsive and mobile-first user interfaces. The latest version of Bootstrap -- Bootstrap 5 brings many new features such as the close button. In this example, we've seen how to use Bootstrap 5 close button to dismiss components like popovers, modals and alerts.
