import React from 'react'

import { getAppStaticProps } from '../../lib/api/getAppStaticProps'

import { JobComponent } from '../../components/jobs/job'
import { Job } from '../../src/models/classes/Job'

import { mapToComponents } from '../../src/helpers/mapMap'
import { transformData } from '../../src/helpers/transformData'


import { 
    AppDataProps,
} from '../../src/types'

export const getStaticProps = getAppStaticProps

const JobsPage = (props: AppDataProps) => {
        
    const { jobModels } = transformData(props)
    
    return <div className="print">  
            {            
                mapToComponents<Job>(jobModels, (job: Job, i: number)  => {
                    return  <JobComponent
                        id={ `job-${ job.uid }` }
                        key={ job.uid } 
                        job={ job } 
                        bookmarked={  false }
                        annotationText={ null }
                        selected={ false }
                        handleSelect= { () => { void 0 }}
                    />
                })
            }
        </div> 
       
}

export default JobsPage