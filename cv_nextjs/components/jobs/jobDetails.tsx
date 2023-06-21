import React, { useContext } from 'react' 

import { Job } from "../../src/models/classes/Job"

import { AnnotationsComponent } from '../widget/annotations'
import { TechListComponent } from '../widget/tech'

import { Resource } from "../../src/types"

import { 
    StyledJobDetail, 
} from '../../styles/main.styled'
import { CompanyComponent } from '../widget/company'
import { BtnPlus } from '../widget/buttons'

type Props = {
    job: Job;
    showActions: (item: Resource) => void;
    bookmarked: boolean;
    companyBookmarked: boolean;
    annotationText: string | null;
}

export const JobDetailsComponentBase = ({ 
        job, 
        showActions, 
        bookmarked, 
        annotationText, 
        companyBookmarked } : Props) => {

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
                job.description.map((task: string) => {
                    return <li key={ task.replace(/\s/g, '') }>{ task }</li>
                })
            }
        </ul>
        <div>
            <p> Job type:
                {
                    job.jobType.filter(jt => jt.prefix == "TIME").map((jobTypeItem, i) => {
                        return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < job.jobType.length - 1 ? ', ' : '' }` }</span>
                    })
                } 
            </p>
            <p> Working From: 
            {
                job.jobType.filter(jt => jt.prefix == "PLACE").map((jobTypeItem, i) => {
                    return <span className="resource-name" key={ jobTypeItem.uid }> { jobTypeItem.name }{ `${ i < job.jobType.length - 1 ? ', ' : '' }` }</span>
                })
            } 
        </p>
        </div>
        <TechListComponent
            techs={ job.tech}
            showActions={ showActions }
        />
    </StyledJobDetail>
}

export const JobDetailComponent = React.memo(
    JobDetailsComponentBase, 
    (p: Props, c: Props) => {
        return c.job.uid == p.job.uid && c.annotationText == p.annotationText && p.bookmarked == c.bookmarked
    }
)