import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import config from 'config'
import styles from '@/layouts/Base.module.css'

export interface BaseLayoutProps {
  title?: string
  description?: string
  classNames?: string[]
}

export default function BaseLayout({
  title,
  description,
  classNames = [],
  children,
}: PropsWithChildren<BaseLayoutProps>) {
  const pageTitle = (title && `${config.title} | ${title}`) || config.title
  const pageDescription = description || config.description
  const pageClassNames = [styles.root, ...classNames].filter(Boolean).join(' ')

  return (
    <div className={pageClassNames}>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="copyright"
          content={`Copyright (c) ${config.copyright.start}–${config.copyright.end} ${config.author.name}`}
        />
        <meta name="author" content={config.author.name} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="supported-color-schemes" content="light dark" />
        <link rel="canonical" href={`${config.baseURL}`} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {children}
    </div>
  )
}
