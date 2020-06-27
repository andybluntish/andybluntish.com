import React, { PropsWithChildren, ReactElement } from 'react'

export interface IconProps {
  name: string
  title: string
  size?: number
  fill?: string
}

export default function Icon({
  name,
  title,
  size = 20,
  fill = 'currentColor',
  children,
}: PropsWithChildren<IconProps>): ReactElement {
  return (
    <svg viewBox={`0 0 ${size} ${size}`} fill={fill} role="img" aria-labelledby={`t-${name}`}>
      <title id={`t-${name}`}>{title}</title>
      {children}
    </svg>
  )
}
