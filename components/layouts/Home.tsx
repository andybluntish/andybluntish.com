import React, { PropsWithChildren } from 'react'
import Layout, { BaseLayoutProps as LayoutProps } from '@/layouts/Base'
import styles from '@/layouts/Home.module.css'

export interface HomeLayoutProps extends LayoutProps {}

export default function HomeLayout({
  classNames = [],
  children,
  ...props
}: PropsWithChildren<HomeLayoutProps>) {
  return (
    <Layout classNames={[styles.root, ...classNames]} {...props}>
      {children}
    </Layout>
  )
}
