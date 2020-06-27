import React, { ReactElement } from 'react'
import Contact from '@/components/Contact'
import Portrait from '@/components/Portrait'

export default function Footer(): ReactElement {
  return (
    <footer role="contentinfo">
      <Contact />
      <Portrait />
    </footer>
  )
}
