---
title: Code
description: Links to code written, and contributed to, by {{site.author.name}}.
order: 1
resources:
  - title: grunt-xsltproc
    description: Apply XSLT stylesheets to XML and HTML documents from Grunt.
    links:
      link: https://github.com/andybluntish/grunt-xsltproc
  - title: ember-cli-imagemin
    description: Ember CLI addon to minify images in production with [broccoli-imagemin](https://github.com/Xulai/broccoli-imagemin).
    links:
      link: https://github.com/andybluntish/ember-cli-imagemin
  - title: ember-cli-replace
    description: Ember CLI addon to replace text patterns in files with [applause](https://github.com/outaTiME/applause)
    links:
      link: https://github.com/andybluntish/ember-cli-replace
  - title: ember-cli-latex-maths
    description: Ember CLI addon to typeset LaTeX maths expressions using [KaTeX](http://khan.github.io/KaTeX/).
    links:
      link: https://github.com/andybluntish/ember-cli-latex-maths
  - title: simple-typography
    description: Simple CSS styles for nice typography - a nice place to start.
    links:
      link: https://github.com/andybluntish/simple-typography
      demo: http://codepen.io/andybluntish/pen/ogBgBQ?editors=010
  - title: simple-grids
    description: A simple fluid grids implementation for modern browsers, including column and block list variants.
    links:
      link: https://github.com/andybluntish/simple-grids
      demo: http://codepen.io/andybluntish/pen/RNzyZM?editors=010
  - title: Dotfiles
    description: Dotfiles and configuration for Vim, Git, tmux and Bash.
    links:
      link: https://github.com/andybluntish/dotfiles
  - title: Game of Life
    links:
      link: https://github.com/andybluntish/game_of_life
    description: Conway's Game of Life in ruby.
---

<ul class="resource-list">
  {% for resource in page.resources %}
    <li class="resource-list__item">
      <div class="resource-list__header">
        <h2 class="resource-list__title">
          <a href="{{resource.links.link}}" class="resource-list__link">{{resource.title}}</a>
        </h2>

        <ul class="resource-list__links">
          {% for link in resource.links %}
            <li class="resource-list__links-item">
              <a href="{{link[1]}}" class="resource-list__link">
                <svg xmlns="http://www.w3.org/2000/svg" class="resource-list__icon--{{link[0]}}" role="presentation">
                  <use xlink:href="/img/icons.svg#icon--{{link[0]}}"></use>
                </svg>
                {{link[0]}}
              </a>
            </li>
          {% endfor %}
        </ul>
      </div>

      <div class="resource-list__body">
        {{resource.description | liquify | markdownify }}
      </div>
    </li>
  {% endfor %}
</ul>
