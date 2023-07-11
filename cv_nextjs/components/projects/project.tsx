import React from 'react' 

import { AnnotationsComponent } from '../widget/annotations'

import { StyledJobContainer } from '../../styles/main.styled'

import { Project } from '../../src/models/classes/Project'
import { RichTextParagraphComponent } from '../widget/richTextParagraph'

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

    return <StyledJobContainer id={ id } className={ selected ? "selected" : "" }>
        <h2> 
            <span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
            { project.name }
            </span>
            <i 
                className={ "job-selector fa fa-chevron-right" }
                onClick={ handleSelect }
            />
        </h2>
        { annotationText ? <AnnotationsComponent note={ annotationText } /> : null }
        <h3>
            <RichTextParagraphComponent text={ project.notes } />
        </h3>
        <ul>
        { 
            project.status.map((ps, i) => <li key={ i }><RichTextParagraphComponent text={ ps } /></li>)
        }
        </ul>
    </StyledJobContainer>
}

export const ProjectComponent = React.memo(ProjectComponentBase, memoComparator)