import React, { PropsWithChildren, ReactElement } from 'react'
// import styles from '@/layouts/Home.module.css'

export interface EmailIconProps {
  name: string
  title: string
  href?: string
}

export default function EmailIcon({
  name,
  title,
  href,
  children,
}: PropsWithChildren<EmailIconProps>): ReactElement {
  return <svg role="img" aria-labelledby={`t-${name}`}></svg>
}
