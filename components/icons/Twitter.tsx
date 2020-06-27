import React, { ReactElement } from 'react'
import Icon from './Icon'

export default function Twitter(): ReactElement {
  const title = 'Twitter'
  const name = title.toLocaleLowerCase()

  return (
    <a href="https://twitter.com/andybluntish/" rel="me" title={title}>
      <Icon name={name} title={title}>
        <path d="M6.661 17.314c-2.086 0-4.026-.611-5.661-1.66a7.414 7.414 0 0 0 5.468-1.529 3.695 3.695 0 0 1-3.45-2.564 3.695 3.695 0 0 0 1.668-.064 3.694 3.694 0 0 1-2.963-3.621V7.83a3.69 3.69 0 0 0 1.673.462 3.691 3.691 0 0 1-1.143-4.93A10.478 10.478 0 0 0 9.865 7.22a3.692 3.692 0 0 1 3.597-4.535c1.062 0 2.021.449 2.696 1.166a7.408 7.408 0 0 0 2.344-.896 3.698 3.698 0 0 1-1.623 2.043A7.34 7.34 0 0 0 19 4.417a7.513 7.513 0 0 1-1.843 1.912c.007.159.011.318.011.478 0 4.881-3.714 10.507-10.507 10.507" />
      </Icon>
    </a>
  )
}
