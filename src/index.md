---
eleventyNavigation:
  key: About
  order: 1
---

<div>
G’day, my name is [Andy](/) <span role="img" aria-label="waving hand">👋</span>

I’m a software engineer from Australia. I love using the web to build things that make people’s lives easier. I enjoy pragmatic, user-friendly design, and believe in a responsibly delivered, accessible experience for everyone.

I also like _fun_ things, such as riding my bike, brewing my own [beer](/beer/brew-log/), and beating my kids at video games—while I still can. I spend my days building tools that help people receive the care they need, and _I love it_.
</div>

<img src="/img/me.png" alt="Pixelated, black and white, sketch portrait of Andy" width="323" height="419">

{% css %}
  body>main {
    display: grid;
    align-items: center;
    align-self: center;
    gap: var(--space-xl);
    max-width: 60rem;

    @media (min-width: 42rem) {
      grid-template-columns: auto auto;
    }

    &>img {
      image-rendering: crisp-edges;
      image-rendering: pixelated;
      margin: auto;
      width: 100%;
      max-width: 250px;
    }
  }
{% endcss %}
