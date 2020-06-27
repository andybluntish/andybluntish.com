import React, { ReactElement } from 'react'
import Icon from './Icon'
import config from 'config'

export default function Email(): ReactElement {
  const title = 'Email'
  const name = title.toLocaleLowerCase()

  return (
    <a href={`mailto:${config.contact.email}`} className={`u-${name}`} rel="me" title={title}>
      <Icon name={name} title={title}>
        <path d="M0 2.5V5l10 5 10-5V2.5H0zm0 5v10h20v-10l-10 5-10-5z" />
      </Icon>
    </a>
  )
}
