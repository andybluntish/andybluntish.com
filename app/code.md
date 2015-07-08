---
title: Code
description: Links to code written, and contributed to, by {{site.author.name}}.
order: 1
repos:
  - title: grunt-xsltproc
    link: https://github.com/andybluntish/grunt-xsltproc
    description: Apply XSLT stylesheets to XML and HTML documents from Grunt.
  - title: ember-cli-imagemin
    link: https://github.com/andybluntish/ember-cli-imagemin
    description: Ember CLI addon to minify images in production with [broccoli-imagemin](https://github.com/Xulai/broccoli-imagemin).
  - title: ember-cli-replace
    link: https://github.com/andybluntish/ember-cli-replace
    description: Ember CLI addon to replace text patterns in files with [applause](https://github.com/outaTiME/applause)
  - title: ember-cli-latex-maths
    link: https://github.com/andybluntish/ember-cli-latex-maths
    description: Ember CLI addon to typeset LaTeX maths expressions using [KaTeX](http://khan.github.io/KaTeX/).
  - title: simple-typography
    link: https://github.com/andybluntish/simple-typography
    description: Simple CSS styles for nice typography - a nice place to start.
  - title: simple-grids
    link: https://github.com/andybluntish/simple-grids
    description: A simple fluid grids implementation for modern browsers, including column and block list variants.
  - title: Dotfiles
    link: https://github.com/andybluntish/dotfiles
    description: Dotfiles and configuration for Vim, Git, tmux and Bash.
  - title: Game of Life
    link: https://github.com/andybluntish/game_of_life
    description: Conway's Game of Life in ruby.
---

<ul class="repo-list">
  {% for repo in page.repos %}
    <li class="repo-list__item">
      <h3 class="repo-list__title">
        <a href="{{repo.link}}" class="repo-list__link" rel="me">{{repo.title}}</a>
      </h3>
      <div class="repo-list__description">
        {{repo.description | liquify | markdownify }}
      </div>
    </li>
  {% endfor %}
</ul>
