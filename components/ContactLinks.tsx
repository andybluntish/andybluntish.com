import React, { ReactElement } from 'react'
import Twitter from '@/components/icons/Twitter'
import CodePen from '@/components/icons/CodePen'
import GitHub from '@/components/icons/GitHub'
import Instagram from '@/components/icons/Instagram'
import Email from '@/components/icons/Email'

export default function ContactLinks(): ReactElement {
  return (
    <section id="contact">
      <ul>
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
    </section>
  )
}
