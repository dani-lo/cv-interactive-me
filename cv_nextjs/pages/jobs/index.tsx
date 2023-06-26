import React, { Suspense, useContext, useEffect, useState } from 'react'

import { CvJobsContext } from '../_app'

import { getAppStaticProps } from '../../lib/api/getAppStaticProps'

import { JobComponent } from '../../components/jobs/job'
import { ActionsModal } from '../../components/actions/actionsModal'
import { JobDetailComponent } from '../../components/jobs/jobDetails' 

import { Job } from '../../src/models/classes/Job'
import { IBookmarkKeys } from '../../src/models/mixins/withBookmark'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'
import { annotationForResource } from '../../src/helpers/actionForResource'

import { ErrorBoundary } from '../../src/hoc/withError'

import { 
    AppDataProps,
    Resource 
} from '../../src/types'
import { deepLinkSelected } from '../../src/helpers/deeplinkSelected'

export const getStaticProps = getAppStaticProps

function Loading() {
    return <h2>🌀 Loading...</h2>;
}

const JobsPage = (props: AppDataProps) => {
        
    const { jobModels } = transformData(props)

    const [selectedJob, setSelectedJob] = useState<Job | null | undefined>(null)

    useEffect(() => {

        const linkedJobID = Number(`${ document.location.search }`.replace(/\?[a-z]*=/, ''))
        const linkedJob = linkedJobID && !isNaN(linkedJobID) ? jobModels.get(linkedJobID) : null

        if (linkedJob) {
            setSelectedJob(linkedJob)
            
            const tgt = document.getElementById(`job-${ linkedJobID }`)

            tgt?.scrollIntoView()
        }
    }, [jobModels])
    
    const ctx = useContext(CvJobsContext)

    const [actionItem, setActionItem] = useState<Resource | null>(null)
    
    if (ctx === null) {
        return null
    }
    
    const { filters} = ctx.appstate
    
    const handleOpen = (item: Resource | null) => {       
        if (item !== null) { 
            setActionItem(item) 
        }
    }

    const handleClose = () => {
        setActionItem(null);
    }


    // console.log('JOBS:: props.jobs.length', props.jobs.length)
    
    return <div className="page page-grid">  
        <div className="jobs-container">
            {            
                mapToComponents<Job>(jobModels, (job: Job, i: number)  => {

                    if (filters && !job.display(filters) ) {
                        return null
                    }
                    
                    const annotation = annotationForResource(job, ctx.appstate)
                    const annotationText = annotation ? (annotation.text || '') : null
                    const selected = selectedJob?.uid == job.uid
                    
                    return  <JobComponent
                        id={ `job-${ job.uid }` }
                        key={ job.uid } 
                        job={ job } 
                        showActions = { handleOpen }
                        bookmarked={ job[IBookmarkKeys.STATUS](ctx) }
                        annotationText={ annotationText }
                        selected={ selected }
                        handleSelect= { () => {
                            setSelectedJob(job)
                            deepLinkSelected(job)
                        }}
                    />
                })
            }
        </div> 
        {
            selectedJob ? <div><JobDetailComponent 
                job={ selectedJob }
                showActions = { handleOpen }
                bookmarked={ selectedJob[IBookmarkKeys.STATUS](ctx) }
                companyBookmarked= { selectedJob.company !== null
                    ? selectedJob.company[IBookmarkKeys.STATUS](ctx) 
                    : false 
                }
                annotationText={ annotationForResource(selectedJob, ctx.appstate)?.text || null }
            /></div> : null
        } 
        <ActionsModal 
            open={ !!actionItem }
            item={ actionItem }
            handleClose={ handleClose }
        />
    </div>
}

export default JobsPage