import React, { RefAttributes } from 'react' 

import { Job } from "../../src/models/classes/Job"
import { Resource } from "../../src/types"

import { StyledJobContainer } from '../../styles/main.styled'

type JobProps = {
    bookmarked: boolean;
    annotationText: string | null;
    selected: boolean;
    handleSelect: () => void;
    job: Job;
    id: string;
}

export const JobComponentBase : React.FunctionComponent<JobProps & RefAttributes<any>> = ({ 
    job, 
    id,
    handleSelect,
    bookmarked, 
    selected,
} : JobProps) => {
    
    return <StyledJobContainer id={ id } className={ selected ? "selected" : "" }>
         <h2 > 
            <span>
                {
                    bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
                }
                
                { job.period.formatted }
            </span>
            <i 
                className={ "job-selector fa fa-chevron-right" }
                onClick={ handleSelect }
            />
        </h2>
        <h3> 
        { job.position }{ job.company ? `, ${  job.company.name  }` : '' }
        </h3>
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
    </StyledJobContainer>
}

const comparator = (p: JobProps, c: JobProps) => {
    return c.annotationText == p.annotationText && 
            p.bookmarked == c.bookmarked && 
            p.selected == c.selected
}

export const JobComponent = React.memo<JobProps>(
    JobComponentBase, 
    comparator
)
