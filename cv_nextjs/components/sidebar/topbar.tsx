

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'

import { StyledMobileBar } from '../../styles/main.styled'

import * as atoms from '../../src/store-jotai/atomicUiStore'

export const TopBarComponent = () => {

  const router = useRouter()

  const [_clearSelections, setClearSelections] = useAtom(atoms.clearSelections)

  const [showsettings, setShowsettings] = useAtom(atoms.uiShowSettingsAtom)
  const [showactions, setShowactions] = useAtom(atoms.uiShowActionsAtom)

  const [selectedJob, _setSelectedJob] = useAtom(atoms.uiSelectedJobAtom)
  const [selectedProj, _setSelectedProj] = useAtom(atoms.uiSelectedProjectAtom)

  const href = router.asPath.indexOf('jobs') !== -1 ? '/jobs' : router.asPath.indexOf('project') !== -1 ? '/projects' : ''
  
  const hasJobOrProject = !!selectedProj || !!selectedJob
    
  console.log(hasJobOrProject)

  return <StyledMobileBar>
        <Link href={ href }>
            {
                showactions ? 
                    <span className="html-icon">
                        <i   
                            aria-hidden="true" 
                            className="fa fa-times" 
                            onClick={() => {
                                setClearSelections() 
                            }}
                        />   
                    </span> 
                    : hasJobOrProject ?
                        <span className="html-icon">
                            <i   
                                aria-hidden="true" 
                                className="fa fa-arrow-left" 
                                onClick={() => {
                                    setClearSelections() 
                                }}
                            />   
                        </span> : null
            }
        </Link>
        <div>
            <span className={ `html-icon${ showsettings || showactions ? ' disabled' : '' }` }>
                <i 
                    aria-hidden="true" 
                    className="fa fa-cog" 
                    onClick={ () => setShowsettings(!showsettings) } 
                />
            </span>
            <span className={ `html-icon${ showsettings || showactions ? ' disabled' : '' }` }>
                <i 
                    aria-hidden="true" 
                    className="fa fa-bars" 
                    onClick={ () => setShowactions(!showactions) } 
                />
            </span>
        </div>
    </StyledMobileBar>
}
