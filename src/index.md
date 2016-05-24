---
description: "{{ site.data.author.name }} is a web developer living and working in {{ site.data.author.location.city }}, {{ site.data.author.location.country }}."
classNames:
  - vcard
  - h-card
---

G'day, my name is <a href="{{ site.baseurl }}/" rel="me" class="u-url url p-name fn n"><span class="p-given-name given-name">{{ site.data.author.name | split: ' ' | first }}</span> <span class="p-family-name family-name">{{ site.data.author.name | split: ' ' | last }}</span></a> 👋

I'm a <span class="p-role role">{{ site.data.author.role }}</span> based in <a href="https://www.google.com.au/maps/place/{{ site.data.author.location.city }}+{{ site.data.author.location.region.abbr }}+{{ site.data.author.location.country }}" class="p-adr h-adr adr"><span class="p-locality locality">{{ site.data.author.location.city }}</span>, <span class="p-country-name country-name">{{ site.data.author.location.country }}</span></a>. I'm a huge fan of the web, and love using technology to help solve problems.

As a *developer*, I love writing code that makes peoples lives easier. I'm excited about pushing the web forward, and the possibilities offered by the latest tools and technology. As a *designer*, my focus is on producing simple, intuitive products that allow people to get work done. I love building pragmatic, accessible interfaces that are attractive and easy to use.

I want the web to work. I'm a strong proponent of a [future friendly](http://futurefriendlyweb.com/), [standards compliant](http://www.webstandards.org/ "The Web Standards Project") web, and believe in a responsibly delivered, [accessible](http://www.w3.org/WAI/ "Web Accessibility Initiative") experience for everyone.

I also like _fun_ things, such as riding my bike, and brewing my own beer. I spend my days building tools that help people learn, and *I love it*.

<div style="overflow: hidden; margin-top: auto">
  {% include contact.html id="contact" %}
  {% include portrait.html %}
</div>
