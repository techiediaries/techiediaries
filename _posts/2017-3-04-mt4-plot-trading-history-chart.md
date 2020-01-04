---
layout: post
title: "How to draw/plot trading history on MT4 charts "
image: "images/content/mt4-plot-trading-hsitory-chart.png"
excerpt: "In this post ,I'm going to show you how to plot trading history or previous closed positions on your MetaTrader 4 chart " 
tags : mt4  trading 
---

{% include image.html 
    img="images/content/mt4-plot-trading-hsitory-chart.png" 
    title="show previous positions on mt4 chart " 
%}

Forex trading is all about history ,in fact technical analysis is entirely based on market history data so taking account of your trading activities on the past is essential for your future success in trading .

MT4 provides account history which shows you a table of your previous trading positions with green and red colors indicating if the position was successful or not or if the position hit the take profit or the stop loss targets .While account history table is a such helpful feature of MT4 ,it is still not presented on the most useful way for traders i.e it is not plotted on the chart .

A technical analysis trader use charts to take actions and use charts to spot opportunities so the best way for him to learn from his past mistakes or successful experiences should be also through the charts .Therefor we need a way to plot past taken positions (both winners and losers ) on the chart ,this is the subject of this article .So how can you show/plot previous closed positions on your MT4 chart ?

Let's start by the first easy way to show a past position

Drag and drop position to chart 
--------------------------------------------
--------------------------------------------
 
Newer versions of MT4 allows you to show a past position on chart ,all you need to do is to

<ol> 
<li>
Go to your MT4 account history tab 
</li>
<li>
Look for the trade you want to show on the chart  
</li>
<li>       
Drag the position and drop it on the chart 
</li>
<li>
That is it ,you should now be able to see three indicators 
</li>
</ol>

{% include image.html 
    img="images/content/mt4-plot-trading-hsitory-chart/pastposition.png" 
    title="show previous positions on mt4 chart " 
%}


The blue arrow indicates the entry of the position .

The blue underscore indicates the target of the position .

The red shape indicates the stop loss which was hit .  


Use OrderHistory.mql The order history script 
---------------------------------------
--------------------------------

OrderHistory.mql4 is a free MQL4 script for MT4 which allows you to automatically see previous closed positions
on your trading chart .

To use it ,just follow the steps below  
<ol>
<li>

Download the script from this <a href="https://www.forexfactory.com/attachment.php/2035760?attachmentid=2035760&d=1475968279">
link</a>

</li>
<li>
Next open your MT4 Scripts folder then copy the script there .
</li>
<li>
Restart MT4
</li>
<li>
Go to Navigator window -> Scripts then just drag and drop the Script to your chart to activate 
</li> 
</ol>

{% include image.html 
    img="images/content/mt4-plot-trading-hsitory-chart/historyscript.png" 
    title="show previous positions on mt4 chart " 
%}

Now you can easily learn from your winners and losers positions by putting them in front of your eyes .
You can spot weaknesses of your trading plans for things such as bad take profit and stop loss targets .
You can also make sure if you have entered the previous trade with a good trading setup or it was just an emotional action  .Yes believe me since i’ve started to plot my account history in chart I was able to see and to figure out many of my mistakes when entering positions . 

Thanks for reading and please don’t hesitate to ask me for help if you have any question by just dropping a comment below .

