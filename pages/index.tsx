import React, { ReactElement } from 'react'
import Layout from '@/layouts/Home'

export default function Home(): ReactElement {
  return (
    <Layout>
      <section id="about">
        <p>
          G’day, my name is{' '}
          <a href="https://andybluntish.com/" rel="me" className="u-url p-name">
            <span className="p-given-name">Andy</span>
          </a>{' '}
          👋
        </p>
        <p>
          I’m a <span className="p-role">software engineer</span> based in{' '}
          <a
            href="https://www.google.com.au/maps/place/Adelaide+SA+Australia"
            className="p-adr h-adr"
          >
            <span className="p-locality">Adelaide</span>,{' '}
            <span className="p-country-name">Australia</span>
          </a>
          . I’m a huge fan of the web, and love using technology to help solve problems.
        </p>
        <p>
          As a <em>developer</em>, I love writing code that makes people’s lives easier. I’m excited
          about pushing the web forward, and the possibilities offered by the latest tools and
          technology. As a <em>designer</em>, my focus is on producing simple, intuitive products
          that allow people to get work done. I love building pragmatic, accessible interfaces that
          are attractive and easy to use.
        </p>
        <p>
          I want the web to work. I’m a strong proponent of a{' '}
          <a href="http://futurefriendlyweb.com/">future friendly</a>,{' '}
          <a href="https://www.webstandards.org/">standards compliant</a> web, and believe in a
          responsibly delivered, <a href="https://www.w3.org/WAI/">accessible</a> experience for
          everyone.
        </p>
        <p>
          I also like <em>fun</em> things, such as riding my bike, and brewing my own beer. I spend
          my days building tools that help make the web faster, and <em>I love it</em>.
        </p>
      </section>
    </Layout>
  )
}
