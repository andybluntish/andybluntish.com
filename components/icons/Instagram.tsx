import React, { ReactElement } from 'react'
import Icon from './Icon'

export default function Instagram(): ReactElement {
  const title = 'Instagram'
  const name = title.toLocaleUpperCase()

  return (
    <a href="https://instagram.com/andybluntish/" rel="me" title={title}>
      <Icon name={name} title={title}>
        <path d="M16.924 19H3.076A2.077 2.077 0 0 1 1 16.922V3.077C1 1.93 1.93 1 3.076 1h13.848C18.07 1 19 1.93 19 3.077v13.845C19 18.07 18.07 19 16.924 19zM10 6.539a3.461 3.461 0 1 0 0 6.922 3.462 3.462 0 0 0 0-6.922zm6.924-2.769a.694.694 0 0 0-.693-.693h-2.076a.692.692 0 0 0-.691.693v2.077c0 .382.309.692.691.692h2.076a.693.693 0 0 0 .693-.692V3.77zm0 4.845h-1.567c.114.444.182.906.182 1.385a5.538 5.538 0 1 1-11.076 0c0-.479.067-.941.182-1.385H3.076v7.616c0 .383.311.691.693.691H16.23a.692.692 0 0 0 .693-.691V8.615z" />
      </Icon>
    </a>
  )
}
