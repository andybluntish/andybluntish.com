import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Andy Stanford-Bluntish</title>
        <meta name="description" content="I build things on the web. I love what I do." />
        <meta name="copyright" content="Copyright (c) 2006–2019 Andy Stanford-Bluntish" />
        <meta name="author" content="Andy Stanford-Bluntish" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="supported-color-schemes" content="light dark" />
        <link rel="canonical" href="https://andybluntish.com/" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <p>Hello world</p>
    </div>
  )
}
