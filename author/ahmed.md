---
layout: page
title: Ahmed Bouchefra
comments: false
---

<section>
<div>
<p>
Ahmed Bouchefra is a web developer with 5+ years of experience and technical author with an engineering diploma (Master's degree) on software development. You can hire him with a click on the link above or contact him via his <a href="https://www.linkedin.com/in/mr-ahmed/">LinkedIn account</a>. 

He authored technical content for industry-leading websites such as <a href="https://www.sitepoint.com/author/abouchefra/">SitePoint</a>, <a href="https://www.smashingmagazine.com/author/ahmed-bouchefra/">Smashing Magazine</a>, <a href="https://www.freecodecamp.org/news/author/ahmed/">freeCodeCamp</a>, <a href="https://blog.jscrambler.com/author/ahmed">JScrambler</a>, <a href="https://www.digitalocean.com/community/users/mrnerd">DigitalOcean</a>, <a href="https://realpython.com/team/abouchefra/">RealPython</a>, Pusher, Buddy, and Auth0, etc.

He designed and implemented projects written in Python with Django, JavaScript and Java. Now focusing on web technologies and building apps with Angular, Ionic and Electron for mobile and desktop.

He also co-authored various books about modern web development that you can find from his <a href="https://www.amazon.com/Ahmed-Bouchefra/e/B07J1XYKT4?ref=dbs_a_def_rwt_hsch_vu00_taft_p1_i0">Amazon Author page</a> and <a href="https://leanpub.com/u/ahmedbouchefra">Leanpub</a>.

</p>
</div>
<div class="masonrygrid row listrecent">



{% for post in site.posts %}
  {% if post.author contains 'ahmed' or post.author contains 'team' %}
    {% include postbox.html %}
  {% endif %}
{% endfor %}


</div>
</section>
