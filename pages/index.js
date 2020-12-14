import React from 'react';
import Menu from '../components/Menu';
import Home from '../components/Home'
import Head from 'next/head';

export default function Index() {
  return (
    <>
    <Head>
      <title>FindMe</title>
    </Head>
    <Menu />
    <Home />
    </>
  );
}
