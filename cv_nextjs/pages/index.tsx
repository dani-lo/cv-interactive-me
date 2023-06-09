import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <h1>
            Curriculum Vitae
          </h1>

          <h3 className={""}>
            interactive CV review
          </h3>
        </div>
        
        <div className={ styles.explainerevidence }>
          <h2>Tech + Start Browsing</h2>
            <p>Curriculum Vitae is implemented in both <strong>Web Assembly</strong> (Rust - Yew) and <strong>Nextjs</strong>, as a means of experimenting both technoogies (but mostly wasm)</p>
            <p><strong>Choose Impementaton</strong></p>
            <ul>
              <li><Link href="/jobs">Nextjs</Link></li>
              <li><Link href="/jobs">Web Assembly (Rust)</Link></li>
            </ul>
        </div>

        <div className={ styles.grid }>
        <div className={ styles.explainer }>
        
          <h2>CV review Features</h2>
          <p>You can browse jobs, project and personal data and use actions (links, annotations and bookmarks) to help you tracking what you are interested in wthin the CV. This works in either version (Nextjs and Rust): they both talk to the same api and share the data that you generate; this means that any of your actions will be recognised by either instance, as long as you persist your actions.</p>
          {/* <ul>
            <li>Filters</li>
            <li>Bookmarks</li>
            <li>Annotations</li>
          </ul> */}
        </div>
          <div className={ styles.explainer }>
              <h2>User token based tracking</h2>
              <p>In order for you to be able to persist your actions (i.e filters, bookmarks ..) this app assigns you a <strong>token</strong>: this is a simple randomly generated 5 characters string, and it is stored locally and used to track your actions: it does not require a login: it simply means that ay time you come back to the app, your actions will be available from your previous interaction. You can also share the token with your colleagues (se below)</p>
              <p>Your assigned token is <strong>123LY</strong></p>
              <p>Manually enter a different token (has to be alphanumeric): <input type="text" value="" /></p>
              
          </div>
          <div className={ styles.explainer }>
            <h2>Persisting</h2>
            <p>Any action (i.e filters, bookmarks) non saved and kept purely in local stateWasm instance) will be lost upon later visits</p>
            <p>Upon adding an action, the app will prompt you to persist your local state remotely via a simple s,all prompt: this way you will be able to use your local token (see above) to retrieve your actions in future.</p>
            <p>You can also ask the app not to prompt you upon adding action: this is done by simply ticking a checkbox within the persist prompt</p>.
          </div>
        </div>

        
        
        

        

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
