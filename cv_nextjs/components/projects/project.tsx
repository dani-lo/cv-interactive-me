import React from 'react' 

import { AnnotationsComponent } from '../widget/annotations'

import { 
    StyledJobContainer,
    StyledProjectStatusList
} from '../../styles/main.styled'

import { Project } from '../../src/models/classes/Project'

type Props = {
    project: Project;
    id: string;
    bookmarked: boolean;
    handleSelect: () => void;
    annotationText: string | null;
    selected: boolean;
}

const memoComparator = (p: Props, c: Props) => {
    return c.project.uid == p.project.uid && 
            c.annotationText == p.annotationText && 
            p.bookmarked == c.bookmarked  && 
            p.selected == c.selected
}

export const ProjectComponentBase = ({ 
    id, 
    project,  
    bookmarked, 
    annotationText, 
    selected, 
    handleSelect 
} : Props) => {

    return <StyledJobContainer id={ id } selected={ selected }>
        <h2> 
            <span>{ project.name }</span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
        </h2>
        { annotationText ? <AnnotationsComponent note={ annotationText } /> : null }
        <div className="job-list-body">
            <div>
                <p>
                    <a href={ project.repo }>Github Repo</a>
                </p>
                <StyledProjectStatusList>
                { 
                    project.status.map((ps, i) => <li key={ i }>{ ps }</li>)
                }
                </StyledProjectStatusList>
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

export const ProjectComponent = React.memo(ProjectComponentBase, memoComparator)