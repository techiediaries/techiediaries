Rails and React - two of very powerful frameworks when it comes to web development. Rails scaffolding and React components make development fast and integrating them in your web application is easy. There are three major ways to do that:

    react-rails gem
    react-on-rails gem
    separate rails API only app and react frontend app

Initially — I took the third option but on realising that I should start with managing one stack instead of two. later decided to go with the second one. In this blog, I will talk about the major problems I faced while merging the two stacks. Along with this, I will also share some good lessons learnt during the entire process of finding out the problems and solving them.
Why react-on-rails

I needed an easy way to merge the two stacks without the need to rewrite the react files. React_on_rails allows you to use JSX components without changing them. You have a separate package.json for all your javascript dependencies which does not rely on rails pipelines at all. It uses rails to include only JS and Webpack compiled files which was perfect match for the use case.

    Figuring solutions is always easy, The difficult part is to figure out the problem

React_on_rails has given the instructions to setup existing rails project so I started with them but ran into many problems as those instructions were not considering the Rails-5 API only projects. When you add react_on_rails and start with it. It gives an error of missing layout as shown in the image.
Layout error

To resolve this, add include ::ActionView::Layouts in your app/application_controller . Once you do this, it starts giving 204 content not found errors . Again after lots of googling and hours of efforts I added some more configurations and managed to make the HTML content work but It was still not loading the JSX components. I looked into the the details of JSX processing from end to end but no luck as I was looking at the wrong place all the time. In this particular case, figuring out the problem became worse as the errors were misleading.
The Aha Moment: Devil was in the details

Finally to figure out the problem I created a sample project from scratch using react_on_rails new project setup instructions and started comparing the generated code with my existing project. The main problem was with the application_controller . Rails-5 API controller doesn’t have features which are required by the browser to load the HTML page like sessions, cookies, layouts etc. This particular information turned out to be crucial to get out of the problem I was facing which I was not aware of at that time.
Solution

To solve this issue just change your API controller to base controller. In your app/application_controller change ApplicationController < ActionController::API toApplicationController < ActionController::Base . This should be enough to get a working project. Though I would suggest to convert your entire rails-5 api only app to normal rails app. It will save your time in future from all these misleading errors. Follow the instructions to convert API only app to rails app.

Go to the directory where you created the app and run the following commands.

$rails new your-current-app-name

Rails will start adding missing files. If some conflict occurs then it will stop and you need to resolve it manually. At the end of it just make sure you have Base controller. Once you have resolved everything run

$bundle install

This will convert your rails-5 API only app to rails app which can easily be integrated with react_on_rails. I submitted a small patch to react_on_rails documentation which provides a step by step guide for setting up rails-5 API only projects. So as the quote says, Solution was just to change a single word but difficult part was to figure out which word to change.
What did I learn?

    As quoted, Finding the problem is most difficult.
    You need to know your tools well and read specifications first
    Pay attention to the details. Small configurations can lead to big failures
    Help others once you know the solution

Thanks for reading!