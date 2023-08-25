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
import { annotationForResource, bookmarkForResource } from '../../src/helpers/actionForResource'
import { StyledInlineWarning} from '../../styles/main.styled'
import { 
    AppDataProps,
    Resource,
} from '../../src/types'

import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { Tabber, pageSize, pageForItem, DateRangedItem } from '../../components/widget/tabber'
import { chunker } from '../../src/helpers/chunk'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
    
    const router = useRouter()


    const [selectedJobId, setSelectedJobId] = useAtom(atoms.uiSelectedJobAtom)

    const [page, setPage] = useState(0)

    const { jobModels } = transformData(props)

    const chunks = chunker<DateRangedItem>([...Array.from(jobModels.values())], pageSize)

    const selectedJob = selectedJobId !== null ? jobModels.get(selectedJobId) : null

    const [actionItem, setActionItem] = useState<Resource | null>(null)
    
    const handleOpen = (item: Resource | null) => {       
        if (item !== null) { 
            setActionItem(item) 
        }
    }

    const handleClose = () => {
        setActionItem(null);
    }

    useEffect(() => {

        const path = router.asPath
        const maybeUid = parseInt(path.replace('/jobs/', ''))

        if (!isNaN(maybeUid) && selectedJobId !== maybeUid) {

            setSelectedJobId(maybeUid)
        } 

    }, [router])
    
    useEffect(() => {
        if (selectedJobId !== null) {

            const newPage = pageForItem(chunks, selectedJobId)

            if (newPage !== page) {
                setPage(newPage)
            } 
        }
        
    }, [page, selectedJobId])

    const ctx = useContext(CvJobsContext)

    if (ctx === null) {
        return null
    }

    const { filters} = ctx.appstate
    
    const containerClassName = `jobs-container${ selectedJob !== null ? ' with-selected' : ''  }`
    
    let anyJobRendered = false

    const list = mapToComponents<Job>(jobModels, (job: Job, i: number)  => {

        // if (filters && !job.display(filters) ) {
        //     return null
        // }

        anyJobRendered = true  

        const annotation = annotationForResource(job, ctx.appstate)
        const annotationText = annotation ? (annotation.text || '') : null
        const selected = selectedJob !== null && selectedJob !== undefined && selectedJob.uid == job.uid

        return  <JobComponent
            pagedOut={ i < (pageSize * page) || i >= ((pageSize * (page + 1))) }
            filteredOut={ !!(filters && !job.display(filters) ) }
            id={ `job-${ job.uid }` }
            key={ job.uid } 
            job={ job } 
            bookmarked={ job[IBookmarkKeys.STATUS](ctx) }
            annotationText={ annotationText }
            selected={ selected }
            handleSelect= { () => {
                router.push(`/jobs/${ job.uid }`)
                setSelectedJobId(job.uid)
            }}
        />
    })

    return <div className="page">
        <Tabber 
            items={ chunks } 
            page={ page }
            onPageSelect={ (p: number) => {
                setPage(p)
                setSelectedJobId(null)
                router.push('/jobs')
            } }
        />
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
                    companyBookmarked= { selectedJob.company !== null && !!bookmarkForResource(selectedJob.company, ctx.appstate) }
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