import React, { ReactElement } from 'react'
import styles from './Contact.module.css'
import Twitter from '@/components/contact-links/Twitter'
import CodePen from '@/components/contact-links/CodePen'
import GitHub from '@/components/contact-links/GitHub'
import Instagram from '@/components/contact-links/Instagram'
import Email from '@/components/contact-links/Email'

export default function Contact(): ReactElement {
  return (
    <ul id="contact" className={styles.root}>
      <li>
        <Twitter />
      </li>
      <li>
        <CodePen />
      </li>
      <li>
        <GitHub />
      </li>
      <li>
        <Instagram />
      </li>
      <li>
        <Email />
      </li>
    </ul>
  )
}
