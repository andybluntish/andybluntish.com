import React, { PropsWithChildren, ReactElement } from 'react'
import styles from '@/layouts/Home.module.css'
import Layout, { BaseLayoutProps as LayoutProps } from '@/layouts/Base'
import Footer from '@/components/Footer'

export interface HomeLayoutProps extends LayoutProps {}

export default function HomeLayout({
  classNames = [],
  children,
  ...props
}: PropsWithChildren<HomeLayoutProps>): ReactElement {
  return (
    <Layout classNames={[styles.root, ...classNames]} {...props}>
      <main className="h-card">{children}</main>

      <Footer />
    </Layout>
  )
}
