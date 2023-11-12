import React from 'react' 

import { Job } from "../../src/models/classes/Job"

import { AnnotationsComponent } from '../widget/annotations'
import { TechListComponent } from '../widget/tech'
import { CompanyComponent } from '../widget/company'

import { Resource } from "../../src/types"

import { 
    StyledJobDetail, 
} from '../../styles/main.styled'


type Props = {
    job: Job;
    showActions: (item: Resource) => void;
    bookmarked: boolean;
    companyBookmarked: boolean;
    annotationText: string | null;
}

export const JobDetailComponent  = ({ 
        job, 
        showActions, 
        bookmarked, 
        annotationText, 
        companyBookmarked } : Props) => {
    
    const job_job_types = job.jobType.filter(jt => jt.prefix == "TIME")
    const job_job_locations = job.jobType.filter(jt => jt.prefix == "PLACE")

    return <StyledJobDetail>
        <h2> 
            <span className="action-wrap" onClick={ () => showActions(job) } >
                <i className="action fa fa-plus" />
                <span>{ job.period.formatted }</span>
            </span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
        </h2>
        { annotationText ? <AnnotationsComponent note={ annotationText }/> : null }
        <h3>
            { job.position }
        </h3>
        {
            job.company !== null ?
                <CompanyComponent 
                    company={ job.company}  
                    showActions={ showActions }
                    bookmarked= { companyBookmarked }
                />
             : null
        }    
        <ul>
            {
                job_job_types.map((jobTypeItem, i) => {
                    return <li 
                        className="itemised" 
                        onClick={() => {
                            showActions(jobTypeItem)
                        }}
                        key={ jobTypeItem.uid }> 
                            <span className="action-wrap evident">
                                <i 
                                    className="action fa fa-plus" 
                                    aria-hidden="true"
                                />  
                                    
                                <span>{ jobTypeItem.name }</span>
                            </span>                                
                    </li>
                })
            } 
        </ul>
        <ul> 
            {
                job_job_locations.map((jobTypeItem, i) => {
                    return <li 
                        className="itemised" 
                        onClick={() => {
                            showActions(jobTypeItem)
                        }}
                        key={ jobTypeItem.uid }> 
                            <span className="action-wrap evident">
                                <i 
                                    className="action fa fa-plus" 
                                    aria-hidden="true"
                                />  
                                    
                                <span>{ jobTypeItem.name }</span>
                            </span>
                            
                    </li>
                })
            } 
        </ul>
 
        <ul>
            {
                job.description.map((task: string) => {
                    return <li key={ task.replace(/\s/g, '') }>{ task }</li>
                })
            }
        </ul>
        <h3 style={{ marginTop: 'var(--gap-huge' }}>Tech</h3>
        <TechListComponent
            techs={ job.tech}
            showActions={ showActions }
        />
    </StyledJobDetail>
}

// export const JobDetailComponent = React.memo(
//     JobDetailsComponentBase, 
//     (p: Props, c: Props) => {
//         return c.job.uid == p.job.uid && c.annotationText == p.annotationText && p.bookmarked == c.bookmarked && p.companyBookmarked == c.companyBookmarked
//     }
// )