---
uuid: 1rb7jxOEkMu4AKFDV4Yw9Y7CFxq
date: 2021-04-24T02:57:53.000Z
---

Adding shadows to images using [ImageMagick](https://imagemagick.org):

```bash
magick convert input.png \( +clone -background black -shadow 30x8+0+0 \) +swap -background none -layers merge +repage output.png
```

Note to self: the spaces inside escaped parentheses are required, or you're gonna have a bad time 😒.
