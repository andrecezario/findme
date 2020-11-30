import React from 'react';
import Container from '@material-ui/core/Container';
import Menu from '../components/Menu';
import Home from '../components/Home'
import Head from 'next/head';

export default function Index() {
  return (
    <>
    <Head>
      <title>FindMe - Home</title>
    </Head>
    <Menu />
    <Home />
    </>
  );
}
