import React from 'react' 

import { AnnotationsComponent } from '../widget/annotations'
import { TechListComponent } from '../widget/tech'

import { Resource } from "../../src/types"

import { 
    StyledJobDetail, 
    StyledProjectStatusList 
} from '../../styles/main.styled'

import { Project } from '../../src/models/classes/Project'
import { ErrorBoundary } from '../../src/hoc/withError'

type Props = {
    project: Project;
    showActions: (item: Resource) => void;
    bookmarked: boolean;
    annotationText: string | null;
}

export const ProjectDetailsComponentBase = ({ 
    project, 
    showActions, 
    bookmarked, 
    annotationText,
} : Props) => {
            
    return <StyledJobDetail>
        <ErrorBoundary>
        <div>
        <h2> 
            <span className="action-wrap">
                <i 
                    className="action fa fa-plus" 
                    onClick={ () => showActions( project ) } 
                />
                <span>{ project.name }</span>
            </span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
        </h2>
        { annotationText ? <AnnotationsComponent note={ annotationText }/> : null }
            <ul  className="margin-top-large margin-bottom-large">
            {
                project.description.map((task: string) => {
                    return <li key={ task.replace(/\s/g, '') }>{ task }</li>
                })
            }
            </ul>
        <p><a href={ project.repo }>Github Repo</a></p>
                <StyledProjectStatusList>
                { 
                    project.status.map((ps, i) => <li key={ i }>{ ps }</li>)
                }
                </StyledProjectStatusList>
        <TechListComponent
            techs={ project.tech}
            showActions={ showActions }
        />
    </div>
    </ErrorBoundary>
    </StyledJobDetail>
}

export const ProjectDetailComponent = React.memo(
    ProjectDetailsComponentBase, 

    (p: Props, c: Props) => {
        return c.project.uid == p.project.uid && 
                c.annotationText == p.annotationText && 
                p.bookmarked == c.bookmarked
    }
)