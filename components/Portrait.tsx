import React, { ReactElement } from 'react'
import config from 'config'

const {
  author: { name },
} = config

export default function Portrait(): ReactElement {
  return (
    <picture>
      <source
        media="(prefers-color-scheme: dark)"
        srcSet="/img/me-dark.jpg 1x, /img/me-lg-dark.jpg 2x"
      />
      <img src="/img/me.jpg" srcSet="/img/me-lg.jpg 2x" alt={name} className="u-photo" />
    </picture>
  )
}
