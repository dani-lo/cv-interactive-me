import { useContext, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import * as atoms from '../../src/store-jotai/atomicUiStore'

import { CvJobsContext } from '../_app'

import { ActionsModal } from '../../components/actions/actionsModal'

import { 
    AppDataProps,
    Resource,
} from '../../src/types'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'
import { getAppStaticProps } from '../../lib/api/getAppStaticProps'
import { Project } from '../../src/models/classes/Project'
import { ProjectComponent } from '../../components/projects/project'
import { StyledInlineWarning} from '../../styles/main.styled'

import { annotationForResource } from '../../src/helpers/actionForResource'
import { IBookmarkKeys } from '../../src/models/mixins/withBookmark'
import { deepLinkSelected } from '../../src/helpers/deeplinkSelected'
import { ProjectDetailComponent } from '../../components/projects/projectDetail'
import { useRouter } from 'next/router'

export const getStaticProps = getAppStaticProps

const ProjectsPage = (props: AppDataProps) => {
    
    const router = useRouter()
    const [selectedProjectId, setSelectedProjectId] = useAtom(atoms.uiSelectedProjectAtom)

    const [actionItem, setActionItem] = useState<Resource | null>(null)

    const path = router.asPath
    const maybeUid = parseInt(path.replace('/projects/', ''))

    useEffect(() => {

        

        if (!isNaN(maybeUid) && selectedProjectId !== maybeUid) {
                        
            setSelectedProjectId(maybeUid)

            const tgt = document.getElementById(`project-${ maybeUid }`)

            tgt?.scrollIntoView()
        }
    }, [maybeUid])

    const handleOpenModal = (item: Resource | null) => {  

        if (item !== null) { 
            setActionItem(item) 
        }
    }

    const handleCloseModal = () => {

        setActionItem(null);
    }

    const { projectModels } = transformData(props)

    const selectedProject = selectedProjectId !== null ? projectModels.get(selectedProjectId) : null

    const ctx = useContext(CvJobsContext)

    if (ctx === null) {
        return null
    }

    const { filters} = ctx.appstate
    
    const containerClassName = `jobs-container${ selectedProject !== null ? ' with-selected' : ''  }`

    let anyProjectbRendered = false

    let list = mapToComponents<Project>(projectModels, (project)  => {

        if (filters && !project.display(filters)) {
            return null
        }

        anyProjectbRendered = true
        
        const annotation = annotationForResource(project, ctx.appstate)
        const annotationText = annotation ? (annotation.text || '') : null
        const selected = selectedProject !== null && selectedProject !== undefined && selectedProject.id == project.id
        
        return  <ProjectComponent
            key={ project.name } 
            id={ `project-${ project.uid }` }
            project={ project } 
            selected={ selected }
            bookmarked={ project[IBookmarkKeys.STATUS](ctx) }
            annotationText={ annotationText }
            handleSelect={() => {
                setSelectedProjectId(project.uid)
                deepLinkSelected(project)
            }}
        />
    })

    return <div className="page">  
        {
            !anyProjectbRendered ? 
            <StyledInlineWarning>
                <p>{ "No Project found - it looks like all  might be filtered out!" }</p>
                <p>{ "Try removing some filters"}</p>
            </StyledInlineWarning> :
            <div className={ containerClassName } data-testid="jobs-container"> 
            {            
                list
            }
        </div>
        }
        {
            selectedProject !== null && selectedProject !== undefined ? 
                <ProjectDetailComponent 
                    project={ selectedProject }
                    showActions = { handleOpenModal }
                    bookmarked={ !!selectedProject[IBookmarkKeys.STATUS](ctx) }
                    annotationText={ annotationForResource(selectedProject, ctx.appstate)?.text || null }
                />
            : null
        } 
        <ActionsModal 
            open={ !!actionItem }
            item={ actionItem }
            handleClose={ handleCloseModal }
        />
    </div>
}

export default ProjectsPage