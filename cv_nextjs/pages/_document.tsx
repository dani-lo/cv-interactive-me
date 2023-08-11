import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html>
      <Head>
        <title>Interactive Me (nextjs)</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        
        <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Manrope:wght@300&family=Noto+Sans:wght@200;400&family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap" rel="stylesheet" />  
       

        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" /> 
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" /> 

        <link rel="icon" type="image/png" href="favicon-32x32.png"/>
      </Head>

      <body>
        <Main />
        <NextScript />
        <script defer src="https://use.fontawesome.com/26d8741e78.js"></script>
      </body>
    </Html>
  )
}

// import { Html, Head, Main, NextScript } from 'next/document'
// import Document from 'next/document'

// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {
//   static async getInitialProps (ctx: any) {
//     const sheet = new ServerStyleSheet()
//     const originalRenderPage = ctx.renderPage

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
//         })

//       const initialProps = await Document.getInitialProps(ctx)
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         )
//       }
//     } finally {
//       sheet.seal()
//     }
//   }

//   render () {
//       return (
//         <Html>
//           <Head>
//             <title>Interactive Me (nextjs)</title>
//             <link rel="preconnect" href="https://fonts.googleapis.com" />
//             <link rel="preconnect" href="https://fonts.gstatic.com" />
            
//             <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&family=Manrope:wght@300&family=Noto+Sans:wght@200;400&family=Roboto:wght@300&display=swap" rel="stylesheet" />
//             <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;600&display=swap" rel="stylesheet" />  
          

//             <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" /> 
//             <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" /> 
//           </Head>

//           <body>
//             <Main />
//             <NextScript />
//             <script defer src="https://use.fontawesome.com/26d8741e78.js"></script>
//           </body>
//         </Html>
//       )
//   }
// }