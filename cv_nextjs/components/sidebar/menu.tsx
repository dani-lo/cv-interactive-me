import Link from 'next/link'

export const AppMenu = () => {

  return <ul className="nav">
    <li>
      <Link href="/jobs">WORK</Link>
    </li>
    <li>
      <Link href="/personal">ABOUT</Link>
    </li>
    <li>
      <Link href="/projects">PROJECTS</Link>
    </li>
  </ul>
}
