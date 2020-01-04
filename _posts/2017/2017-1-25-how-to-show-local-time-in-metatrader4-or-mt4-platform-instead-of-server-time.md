---
layout: post
title: "How to show local time in MetaTrader 4 or MT4 platform instead of server time"
image: "images/content/how-to-show-local-time-in-metatrader4-or-mt4-platform-instead-of-server-time.png"
excerpt: "How to show local time in MetaTrader 4 or MT4 platform instead of server time"
categories : trading
tags : trading mt4 
---

{% include image.html
   img="images/content/how-to-show-local-time-in-metatrader4-or-mt4-platform-instead-of-server-time.png"
       title="How to show local time in MetaTrader 4 or MT4 platform instead of server time"
%}


 

MetaTrader 4 is one of the best Forex trading platforms on the world and it’s offered by the majority of brokers nowadays .But sometimes you’ll find some problems with the platform such as displaying your local time instead of broker server time if your local time is different than broker server time.Unfortunately till now there is no straightforward way or a configuration option to easily switch the platform to use local time instead of server time but  as you may know MT4 is easily extensible and programming gurus have already created any indicators which display your local time alongside broker server time in charts .



Since there is no standard way to solve the problem a lot of indicators exist and many of them plot unnecessary shapes on your charts which is not good for clarity and also for platform performance so you need to make sure to choose an indicator which is lightweight and performs the task cleverly or if you can develop in MQ4 language it is better to create your own custom indicator which can best satisfy your requirements .If this is not an option .Here is the list of the best indicators that can show your local time in charts instead of broker time .This list also will be updated for new indicators each time a good one appears .

The first and easy solution
-----------------------------
------------------------------

Find a broker that’s in your time zone so in this way you don’t need to look for a programmatic solution for displaying  charts data according to your local time .

The second solution
--------------------
--------------------

If your can write and understand MQL4 you can write a script ,indicator or better an expert advisor to display your local time alongside the server time in case it’s different .
You can’t replace or change the internal time that plots on time axis in MT4 but you can display local time above that axis just like in the screenshot below

{% include image.html
   img="images/content/how-to-show-local-time-in-metatrader4-or-mt4-platform-instead-of-server-time/chart-local-time.png"
       title="How to show local time in MetaTrader 4 or MT4 platform instead of server time"
%}

You can use LocalTime() function in MQ4 to write a script that plots your local time .

The third solution 
--------------------
--------------------

If you are not an MQ4 developer then the last option is to look for a free  or buy an indicator which plots local time in MT4 .Here are the ones i’ve used before .

[Time indicator](https://www.mql5.com/en/code/download/11076/Time_indicator.mq4) - indicator for MetaTrader 4

This indicator displays your local time with server time on the chart but it doesn't displays time for every data unit just the time being .

MT4 Clock.mql 

{% include image.html
   img="images/content/how-to-show-local-time-in-metatrader4-or-mt4-platform-instead-of-server-time/mt4-clock.png"
       title="How to show local time in MetaTrader 4 or MT4 platform instead of server time"
%}


This is a very nice indicator for displaying time in different markets (Local ,NewYork ,London etc .) which you can get from this link and compile by yourself .

mMktOpen.mq4


Another indicator for displaying the start and end of trading sessions .You can get it from this link . 

TradingHours.mql4 by Gilani 

{% include image.html
   img="images/content/how-to-show-local-time-in-metatrader4-or-mt4-platform-instead-of-server-time/mt4-trading-hours.png"
       title="How to show local time in MetaTrader 4 or MT4 platform instead of server time"
%}

An indicator which can be used to display the trading hours of each market .Get it from this link .

You can set the shift from server time and the market you want to get its trading hours in blue .For example for USA market 

{% include image.html
   img="images/content/how-to-show-local-time-in-metatrader4-or-mt4-platform-instead-of-server-time/mt4-trading-hours2.png"
       title="How to show local time in MetaTrader 4 or MT4 platform instead of server time"
%}

Maybe these indicators don’t do exactly what do you expect but they are very helpful if you can’t fully change the time axis into your local time .




 


 
