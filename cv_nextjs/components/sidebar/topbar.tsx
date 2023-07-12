

import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledMobileBar } from '../../styles/main.styled'
import * as atoms from '../../src/store-jotai/atomicUiStore'
import { useAtom } from 'jotai'

export const TopBarComponent = () => {

  const router = useRouter()
  const [_, setClearSelections] = useAtom(atoms.clearSelections)

  const href = router.asPath.indexOf('jobs') !== -1 ? '/jobs' : router.asPath.indexOf('project') !== -1 ? '/projects' : ''
  return <StyledMobileBar>
        <Link href={ href }>
            <span 
                className="html-icon"
                onClick={() => {

                    setClearSelections()
                    //router.back()
                }}
                >
                <i 
                    aria-hidden="true" 
                    className="fa fa-arrow-left" 
                />   
            </span>
        </Link>
        <span className="html-icon">
            <i aria-hidden="true" className="fa fa-bars" />
        </span>
    </StyledMobileBar>
}
