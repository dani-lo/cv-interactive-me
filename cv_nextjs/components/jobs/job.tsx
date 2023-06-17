import React, { RefAttributes } from 'react' 

import { Job } from "../../src/models/classes/Job"
import { Resource } from "../../src/types"

import { StyledJobContainer } from '../../styles/main.styled'

type JobProps = {
    showActions: (item: Resource) => void;
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
    showActions, 
    handleSelect,
    bookmarked, 
    annotationText, 
    selected,
} : JobProps) => {
    
    return <StyledJobContainer id={ id } selected={ selected }>
         <h2> 
            { job.period.formatted }
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
        </h2>
        
        <div className="job-list-body">
            <div>
                <h3> 
                    { job.position }{ job.company ? ` @ ${  job.company.name  }` : '' }
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
            </div>
            <div>
                <i 
                    className={`${ selected ? 'job-selector selected' : 'job-selector' } fa fa-chevron-right`}
                    onClick={ handleSelect }
                />
            </div>
        </div>
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
