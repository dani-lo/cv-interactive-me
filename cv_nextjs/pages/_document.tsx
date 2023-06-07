import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Manrope:wght@300&family=Noto+Sans:wght@200;400&family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap" rel="stylesheet" /> 
      </Head>
      <body>
        <Main />
        <NextScript />
        <script defer src="https://use.fontawesome.com/26d8741e78.js"></script>
      </body>
    </Html>
  )
}


