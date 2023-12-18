import React, { useEffect, useRef, useState } from 'react' 
import { CSSTransition } from 'react-transition-group';

import { Job } from "../../src/models/classes/Job"

import { AnnotationsComponent } from '../widget/annotations'
import { TechListComponent } from '../widget/tech'
import { CompanyComponent } from '../widget/company'

import { Resource } from "../../src/types"

import { 
    StyledJobDetail, 
} from '../../styles/main.styled'
import { RichTextParagraphComponent } from '../widget/richTextParagraph';


type Props = {
    job: Job;
    showActions: (item: Resource) => void;
    bookmarked: boolean;
    companyBookmarked: boolean;
    annotationText: string | null;
    jobCompanyAnnotationText: string | null;
}

export const JobDetailComponent  = ({ 
        job, 
        showActions, 
        bookmarked, 
        annotationText, 
        companyBookmarked,
        jobCompanyAnnotationText } : Props) => {
    
    const usejob_job_types = job.jobType.filter(jt => jt.prefix == "TIME")
    const usejob_job_locations = job.jobType.filter(jt => jt.prefix == "PLACE")

    const nodeRef = useRef(null);

    const [inprop, setInprop] = useState(false)
    const [usejob, setUsejob] = useState<null | Job>(null)

    useEffect(() => {
        setInprop(false)
        setTimeout(() => {
            setUsejob(job)
            setInprop(true)
        }, 220)
    }, [job])
    

    return <CSSTransition 
            nodeRef={nodeRef} 
            in={  inprop } 
            timeout={ 100 } 
            classNames="anime-fade-node">
                
            <StyledJobDetail ref={nodeRef} className="anime-fade-init"> 
            { usejob !== null && usejob.id == job.id ? 
                <>
                <h2> 
                    <span className="action-wrap" onClick={ () => showActions(usejob) } >
                        <i className="action fa fa-plus" />
                        <span>{ usejob.period.formatted }</span>
                    </span>
                    {
                        bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
                    }
                </h2>
                { annotationText ? <AnnotationsComponent note={ annotationText }/> : null }
                <h4>
                    { usejob.position }
                </h4>
                {
                    usejob.company !== null ?
                        <CompanyComponent 
                            company={ usejob.company}  
                            showActions={ showActions }
                            bookmarked= { companyBookmarked }
                            annotationText={ jobCompanyAnnotationText }
                        />
                    : null
                }    
                <ul>
                    {
                        usejob_job_types.map((jobTypeItem, i) => {
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
                        usejob_job_locations.map((jobTypeItem, i) => {
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
                        usejob.description.map((task: string) => {
                            return <li key={ task.replace(/\s/g, '') }> 
                                <RichTextParagraphComponent 
                                    text={ task } 
                                />    
                            </li>
                        })
                    }
                </ul>
                <h4 style={{ marginTop: 'var(--gap-huge' }}>Tech</h4>
                <TechListComponent
                    techs={ usejob.tech}
                    showActions={ showActions }
                />
            </>: null 
        }
    </StyledJobDetail>
    </CSSTransition>
}

// export const JobDetailComponent = React.memo(
//     JobDetailsComponentBase, 
//     (p: Props, c: Props) => {
//         return c.job.uid == p.job.uid && c.annotationText == p.annotationText && p.bookmarked == c.bookmarked && p.companyBookmarked == c.companyBookmarked
//     }
// )