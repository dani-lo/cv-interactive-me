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

import { annotationForResource } from '../../src/helpers/actionForResource'
import { IBookmarkKeys } from '../../src/models/mixins/withBookmark'
import { ErrorBoundary } from '../../src/hoc/withError'
import { deepLinkSelected } from '../../src/helpers/deeplinkSelected'
import { ProjectDetailComponent } from '../../components/projects/projectDetail'

export const getStaticProps = getAppStaticProps

const ProjectsPage = (props: AppDataProps) => {
    
    const [selectedProject, setSelecteProject] = useState<Project | null | undefined>(null)
    const [actionItem, setActionItem] = useState<Resource | null>(null)

    const ctx = useContext(CvJobsContext)

    const { projectModels } = transformData(props)

    useEffect(() => {

        const linkedProjectID = Number(`${ document.location.search }`.replace(/\?[a-z]*=/, ''))
        const linkedProject = linkedProjectID && !isNaN(linkedProjectID) ? projectModels.get(linkedProjectID) : null

        if (linkedProject) {
                        
            setSelecteProject(linkedProject)

            const tgt = document.getElementById(`project-${ linkedProjectID }`)

            tgt?.scrollIntoView()
        }
    }, [projectModels])

    if (ctx === null) {
        return null
    }

    const { filters} = ctx.appstate
    
    const handleOpenModal = (item: Resource | null) => {     
        // console.log('handleOpen +++++++++++++++ ', actionItem)  
        if (item !== null) { 
            setActionItem(item) 
        }
    }

    const handleCloseModal = () => {
        setActionItem(null);
    }
    
    return <div className="page">  
        
            <ErrorBoundary>
                <div className="jobs-container">
                    {            
                        mapToComponents<Project>(projectModels, (project)  => {

                            if (filters && !project.display(filters)) {
                                return null
                            }
                            
                            const annotation = annotationForResource(project, ctx.appstate)
                            const annotationText = annotation ? (annotation.text || '') : null
                            const selected = selectedProject?.id == project.id
                            
                            return  <ProjectComponent
                                key={ project.uid } 
                                id={ `project-${ project.uid }` }
                                project={ project } 
                                selected={ selected }
                                bookmarked={ project[IBookmarkKeys.STATUS](ctx) }
                                annotationText={ annotationText }
                                handleSelect={() => {
                                    setSelecteProject(project)
                                    deepLinkSelected(project)
                                }}
                            />
                        })
                    }
                </div> 
                {
                    selectedProject ? <ProjectDetailComponent 
                        project={ selectedProject }
                        showActions = { handleOpenModal }
                        bookmarked={ !!selectedProject[IBookmarkKeys.STATUS](ctx) }
                        annotationText={ annotationForResource(selectedProject, ctx.appstate)?.text || null }
                    /> : null
                } 
                </ErrorBoundary>
            <ActionsModal 
                open={ !!actionItem }
                item={ actionItem }
                handleClose={ handleCloseModal }
            />
        </div>
}

export default ProjectsPage