import Head from "next/head"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>HootBoard Weather App</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
