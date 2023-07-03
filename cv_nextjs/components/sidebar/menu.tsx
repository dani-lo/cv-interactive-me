import Link from 'next/link'
import { useRouter } from 'next/router'

const cname = (isActive: boolean) => {
  if (isActive) {
    return 'active'
  }
  return ''
}

export const AppMenu = () => {

  const router = useRouter()

  return <ul className="nav">
    <li className={ cname(router.pathname.indexOf('jobs') !== -1) }>
      <Link href="/jobs">WORK</Link>
    </li>
    <li className={ cname(router.pathname.indexOf('personal') !== -1) }>
      <Link href="/personal">ABOUT</Link>
    </li>
    <li className={ cname(router.pathname.indexOf('projects') !== -1) }>
      <Link href="/projects">PROJECTS</Link>
    </li>
  </ul>
}
