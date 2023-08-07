import React from 'react' 

import { AnnotationsComponent } from '../widget/annotations'
import { TechListComponent } from '../widget/tech'

import { Resource } from "../../src/types"

import { 
    StyledJobDetail, 
} from '../../styles/main.styled'

import { Project } from '../../src/models/classes/Project'
import { RichTextParagraphComponent } from '../widget/richTextParagraph'

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
        <h2> 
            <span className="action-wrap" onClick={ () => showActions( project ) }>
                <i className="action fa fa-plus" />
                <span>{ project.name }</span>
            </span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
        </h2>
        { annotationText ? <AnnotationsComponent note={ annotationText }/> : null }
            <p className="proj-repo"><a href={ project.repo } target="_blank" rel="noreferrer">Github Repo</a></p>
            <ul>
            {
                project.description.map((task: string) => {
                    return <li key={ task.replace(/\s/g, '') }>
                        <RichTextParagraphComponent 
                            text={ task } 
                        />
                    </li>
                })
            }
            </ul>
        <ul>
        { 
            project.status.map((ps, i) => <li key={ i }><RichTextParagraphComponent text={ ps } /></li>)
        }
        </ul>
        
        <TechListComponent
            techs={ project.tech}
            showActions={ showActions }
        />
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