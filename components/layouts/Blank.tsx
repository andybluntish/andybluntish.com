import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import styles from './Blank.module.css'

export interface BlankLayoutProps {
  title?: string
  description?: string
  classNames?: string[]
}

export default function BlankLayout({
  title,
  description,
  classNames = [],
  children,
}: PropsWithChildren<BlankLayoutProps>) {
  const siteTitle = 'Andy Stanford-Bluntish'
  const siteDescription = 'I build things on the web. I love what I do.'
  const siteAuthor = 'Andy Stanford-Bluntish'
  const copyrightDate = new Date().getFullYear()
  const pageTitle = (title && `${siteTitle} | ${title}`) || siteTitle
  const pageDescription = description || siteDescription
  const pageClassNames = [styles.root, ...classNames].filter(Boolean).join(' ')

  return (
    <div className={pageClassNames}>
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="copyright" content={`Copyright (c) 2006–${copyrightDate} ${siteAuthor}`} />
        <meta name="author" content={siteAuthor} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="supported-color-schemes" content="light dark" />
        <link rel="canonical" href="https://andybluntish.com/" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {children}
    </div>
  )
}
