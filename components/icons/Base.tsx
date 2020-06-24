import React, { PropsWithChildren, ReactElement } from 'react'

export interface IconProps {
  name: string
  title: string
  size?: number
  fill?: string
}

export function Icon({
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

export interface LinkIconProps extends IconProps {
  href?: string
  rel?: string
}

export default function LinkIcon({
  name,
  title,
  href,
  children,
  ...props
}: PropsWithChildren<LinkIconProps>): ReactElement {
  const link =
    href &&
    ((icon: ReactElement) => (
      <a href={href} className={`u-${name}`} title={title} {...props}>
        {icon}
      </a>
    ))

  const icon = (
    <Icon name={name} title={title}>
      {children}
    </Icon>
  )

  return (link && link(icon)) || icon
}
