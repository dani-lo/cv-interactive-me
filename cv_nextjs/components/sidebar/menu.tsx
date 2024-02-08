import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'

import * as atoms from '../../src/store-jotai/atomicUiStore'

const cname = (isActive: boolean) => {
  if (isActive) {
    return 'active'
  }
  return ''
}

export const AppMenu = () => {

  const router = useRouter()

  const [, setClearSelections] = useAtom(atoms.clearSelections)

  return <ul className="nav">
    <li className={ cname(router.pathname.indexOf('jobs') !== -1) }>
      <Link href="/jobs" onClick={() => setClearSelections() }>WORK</Link>
    </li>
    <li className={ cname(router.pathname.indexOf('projects') !== -1) }>
      <Link href="/projects" onClick={() => setClearSelections() }>PROJECTS</Link>
    </li>
    <li className={ cname(router.pathname.indexOf('personal') !== -1) }>
      <Link href="/personal" onClick={() => setClearSelections() }>PERSONAL</Link>
    </li>
  </ul>
}
