import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

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
import { filteredOut, pagedOut } from '../../src/helpers/displayItemFilters'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
    
    console.log(props)
    const router = useRouter()

    const ctx = useContext(CvJobsContext)

    const nodeRef = useRef(null)
    // const nodeRefXpand = useRef(null)

    // const [xpandLayout, setXpandLayout] = useAtom(atoms.uiExpandLayoutAtom)
    const [selectedJobId, setSelectedJobId] = useAtom(atoms.uiSelectedJobAtom)

    const [page, setPage] = useState(0)
    const [inprop, setInprop] = useState(false)
    const [actionItem, setActionItem] = useState<Resource | null>(null)

    const { jobModels } = transformData(props)
    
    const chunks = useMemo(() => {
        return chunker<DateRangedItem>([...Array.from(jobModels.values())], pageSize.dense)
    }, [jobModels])

    const selectedJob = selectedJobId !== null ? jobModels.get(selectedJobId) : null
    
    const { filters} = ctx?.appstate || {}

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

    
    useEffect(() => {
        
        // setTimeout(() => {
                setInprop(true)
            
        // }, 100)
    }, [page])

    const handleOpen = (item: Resource | null) => {       
        if (item !== null) { 
            setActionItem(item) 
        }
    }

    const handleClose = () => {
        setActionItem(null);
    }

    const containerClassName = `jobs-container${ selectedJob !== null ? ' with-selected' : ''  }`
    
    let anyJobRendered = false

    if (ctx === null) {
        return null
    }

    const list = mapToComponents<Job>(jobModels, (job: Job, i: number)  => {

        anyJobRendered = true  

        const annotation = annotationForResource(job, ctx.appstate)
        const annotationText = annotation ? (annotation.text || '') : null

        const selected = selectedJob !== null && selectedJob !== undefined && selectedJob.uid == job.uid

        return  <JobComponent
            pagedOut={ pagedOut(page, i, pageSize.dense) }
            filteredOut={ filteredOut(job, filters || null) }
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
                setInprop(false)

                setTimeout(() => {
                    setPage(p)
                    setSelectedJobId(null)
                    router.push('/jobs')
                }, 200)
                
            }}
        />
    {
        !anyJobRendered ?
            <StyledInlineWarning>
                <p>{ "No Jobs found - it looks like all  might be filtered out!" }</p>
                <p>{ "Try removing some filters"}</p>
            </StyledInlineWarning> :
            <div 
                className={ containerClassName } 
                data-testid="jobs-container">
                    
                <CSSTransition 
                    nodeRef={nodeRef} 
                    in={  inprop } 
                    timeout={ 100 } 
                    classNames="anime-fade-node">
                        
                    <div ref={nodeRef} className="anime-fade-init main-list"> 
                    {            
                        list
                    }
                </div> 
                </CSSTransition>
            {
                selectedJob !== null && selectedJob !== undefined ? 
                    <JobDetailComponent 
                        job={ selectedJob }
                        showActions = { handleOpen }
                        bookmarked={ selectedJob[IBookmarkKeys.STATUS](ctx) }
                        companyBookmarked= { selectedJob.company !== null && !!bookmarkForResource(selectedJob.company, ctx.appstate) }
                        annotationText={ annotationForResource(selectedJob, ctx.appstate)?.text || null }
                        jobCompanyAnnotationText={ selectedJob.company ? (annotationForResource(selectedJob.company, ctx.appstate)?.text || null) : null }
                    /> : null
            } 
            
        </div> 
            // </CSSTransition>
    }
        
        
        <ActionsModal 
            open={ !!actionItem }
            item={ actionItem }
            handleClose={ handleClose }
        />
    </div>
}

export default JobsPage