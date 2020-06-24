import React, { ReactElement } from 'react'
import Icon from '@/icons/Base'
import config from 'config'

export default function EmailIcon(): ReactElement {
  return (
    <Icon name="email" title="Email" href={`mailto:${config.contact.email}`} rel="me">
      <path d="M0 2.5V5l10 5 10-5V2.5H0zm0 5v10h20v-10l-10 5-10-5z" />
    </Icon>
  )
}
