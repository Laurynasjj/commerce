//import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import Footer from '@component/components/Footer'
import { SSRProvider } from '@react-aria/ssr'
import Navbar from '@component/components/Navbar';


function MyApp({ Component, pageProps } : AppProps)  {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Navbar/>
      <Component {...pageProps} />
      <Footer/>
    </NextUIProvider>
  );
}

export default MyApp;