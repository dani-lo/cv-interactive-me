import React, { Suspense, useContext, useEffect, useState } from 'react'

import { CvJobsContext } from '../_app'

import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { getAppStaticProps } from '../../lib/api/getAppStaticProps'

import { JobComponent } from '../../components/jobs/job'
import { ActionsModal } from '../../components/actions/actionsModal'
import { JobDetailComponent } from '../../components/jobs/jobDetails' 

import { Job } from '../../src/models/classes/Job'
import { IBookmarkKeys } from '../../src/models/mixins/withBookmark'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'
import { annotationForResource } from '../../src/helpers/actionForResource'
import { StyledInlineWarning} from '../../styles/main.styled'
import { 
    AppDataProps,
    Resource 
} from '../../src/types'

import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { deepLinkSelected } from '../../src/helpers/deeplinkSelected'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
        
    const { jobModels } = transformData(props)

    const [selectedJobId, setSelectedJobId] = useAtom(atoms.uiSelectedJobAtom)

    const selectedJob = selectedJobId !== null ? jobModels.get(selectedJobId) : null

    const router = useRouter()
    const path = router.asPath
    const maybeUid = parseInt(path.replace('/jobs/', ''))

    const [actionItem, setActionItem] = useState<Resource | null>(null)
    
    const handleOpen = (item: Resource | null) => {       
        if (item !== null) { 
            setActionItem(item) 
        }
    }

    const handleClose = () => {
        setActionItem(null);
    }

    useEffect( () => {

        if (!isNaN(maybeUid) && selectedJobId !== maybeUid) {

            setSelectedJobId(maybeUid)
            
            const tgt = document.getElementById(`job-${ maybeUid }`)

            tgt?.scrollIntoView()
            window.scrollBy(0,-24)
        } 
    }, [maybeUid])
    
    const ctx = useContext(CvJobsContext)

    if (ctx === null) {
        return null
    }

    const { filters} = ctx.appstate
    
    const containerClassName = `jobs-container${ selectedJob !== null ? ' with-selected' : ''  }`
    
    let anyJobRendered = false

    const list = mapToComponents<Job>(jobModels, (job: Job, i: number)  => {

        if (filters && !job.display(filters) ) {
            return null
        }

        anyJobRendered = true  

        const annotation = annotationForResource(job, ctx.appstate)
        const annotationText = annotation ? (annotation.text || '') : null
        const selected = selectedJob !== null && selectedJob !== undefined && selectedJob.uid == job.uid

        return  <JobComponent
            id={ `job-${ job.uid }` }
            key={ job.uid } 
            job={ job } 
            bookmarked={ job[IBookmarkKeys.STATUS](ctx) }
            annotationText={ annotationText }
            selected={ selected }
            handleSelect= { () => {
                deepLinkSelected(job)
                setSelectedJobId(job.uid)
            }}
        />
    })

    return <div className="page">
    {
        !anyJobRendered ?
            <StyledInlineWarning>
                <p>{ "No Jobs found - it looks like all  might be filtered out!" }</p>
                <p>{ "Try removing some filters"}</p>
            </StyledInlineWarning> :
            <div className={ containerClassName } data-testid="jobs-container">
            {            
                list
            }
        </div> 
    }
        
        {
            selectedJob !== null && selectedJob !== undefined ? 
                <JobDetailComponent 
                    job={ selectedJob }
                    showActions = { handleOpen }
                    bookmarked={ selectedJob[IBookmarkKeys.STATUS](ctx) }
                    companyBookmarked= { selectedJob.company !== null
                        ? selectedJob.company[IBookmarkKeys.STATUS](ctx) 
                        : false 
                    }
                    annotationText={ annotationForResource(selectedJob, ctx.appstate)?.text || null }
                /> : null
        } 
        <ActionsModal 
            open={ !!actionItem }
            item={ actionItem }
            handleClose={ handleClose }
        />
    </div>
}

export default JobsPage