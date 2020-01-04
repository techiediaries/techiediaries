---
layout: post
title: "How to clean up and delete all objects from the chart - mt4 script"
image: "images/content/how-to-clean-up-and-delete-all-objects-from-the-chart- mt4-script.png"
excerpt: "How to clean up and delete all objects from the chart - mt4 script"
categories : trading
tags : mt4 trading 
---

{% include image.html
   img="images/content/how-to-clean-up-and-delete-all-objects-from-the-chart- mt4-script.png"
       title="How to clean up and delete all objects from the chart - mt4 script"
%}

Having a clean chart is crucial to take clever trading decisions but who doesn't’ really need indicators to help him make the right trading decision in the right time .Using a lot of indicators renders the chart complex and switching between them leaves your chart with a lot of dead objects that have no benefit ,let alone the objects you draw yourself to help figure out what’s going on ,mainly objects like   support and resistance lines ,circles and other shapes etc .

So in this post i’m going to show a cool MT4 script that helps you clean up your MetaTrader 4 screen with no pain .

So go ahead and create a new mq4 script file ,in case you don’t know it’s just a text file with .mq4 extension instead of .txt

Call the script file whatever you want .I called mine CleanThemAll.mq4

Place the file in MT4 scripts folder ,Mine is in C:\Program Files\MetaTrader 4\MQL4\Scripts 
 
Next copy and paste the following code inside of that file 

    #property copyright "Copyright © 2017, mrnerd"
    #property link      "http://www.techiediaries.com/mql4"


    int start()
    {
    int totalObjects  = ObjectsTotal();
    
    for(int i=totalObjects - 1 ;  i >= 0 ;  i-- ) {
            ObjectDelete(ObjectName(i));
    }
    
    return 0 ;
    }

{% include image.html
   img="images/content/how-to-clean-up-and-delete-all-objects-from-the-chart- mt4-script/clean-chart-mt4-sourcecode.png"
       title="How to clean up and delete all objects from the chart - mt4 script"
%}

Next save the script then restart MT4 .You should find your script at Scripts section of Navigator window 

{% include image.html
   img="images/content/how-to-clean-up-and-delete-all-objects-from-the-chart- mt4-script/clean-chart-click-mt4.png"
       title="How to clean up and delete all objects from the chart - mt4 script"
%}

To clean the chart just drag and drop the screen on the chart and your chart will be cleaned 

Example before activating the script 


{% include image.html
   img="images/content/how-to-clean-up-and-delete-all-objects-from-the-chart- mt4-script/before-chart-clean-mt4.png"
       title="How to clean up and delete all objects from the chart - mt4 script"
%}

Now after activating the script by drag and drop or double click on it 

{% include image.html
   img="images/content/how-to-clean-up-and-delete-all-objects-from-the-chart- mt4-script/after-chart-clean-mt4.png"
       title="How to clean up and delete all objects from the chart - mt4 script"
%}


You can download the script from this link .

Conclusion
--------------
-----------------

Don’t worry about the active objects drawn by active indicators ,they will re-appear again once the chart 
is refreshed or updated but dead objects won’t appear again .Goodbye and Have nice trading .
