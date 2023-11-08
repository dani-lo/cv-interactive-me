import React, { RefAttributes } from 'react' 

import { Job } from "../../src/models/classes/Job"
import { Resource } from "../../src/types"

import { StyledJobContainer } from '../../styles/main.styled'
import { substrNice } from '../../src/helpers/substr'

type JobProps = {
    bookmarked: boolean;
    annotationText: string | null;
    selected: boolean;
    handleSelect: () => void;
    job: Job;
    id: string;
    pagedOut: boolean;
    filteredOut: boolean;
}

export const JobComponentBase : React.FunctionComponent<JobProps & RefAttributes<any>> = ({ 
    job, 
    id,
    handleSelect,
    bookmarked, 
    selected,
    pagedOut,
    filteredOut,
} : JobProps) => {
    
    const desc = job.description[0];
    
    let desc_text = substrNice(desc, 60)

    const cnamePag = pagedOut ? 'paged-out' : ''
    const cnameSel = selected ? 'selected' : ''
    const cnameFil = filteredOut ? 'filtered-out': ''

    return <StyledJobContainer id={ id } className={ `${ cnamePag } ${ cnameSel } ${ cnameFil }` } onClick={ handleSelect }>
         <h2 > 
            <span>
                {
                    bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
                }
                
                { job.period.formatted }
            </span>
            <i className={ "fa fa-chevron-right" } />
        </h2>
        <h3> 
        { job.position }{ job.company ? `, ${  job.company.name  }` : '' }
        </h3>
        <p>{ desc_text } ...</p>
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
            p.selected == c.selected &&
            p.pagedOut == c.pagedOut &&
            p.filteredOut == c.filteredOut
            
}

export const JobComponent = React.memo<JobProps>(
    JobComponentBase, 
    comparator
)
