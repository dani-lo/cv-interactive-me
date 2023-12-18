import React from 'react' 

import { AnnotationsComponent } from '../widget/annotations'

import { StyledJobContainer } from '../../styles/main.styled'

import { Project } from '../../src/models/classes/Project'
import { RichTextParagraphComponent } from '../widget/richTextParagraph'
import { FilteredOutCardWarningComponent } from '../widget/cardWarning'

type Props = {
    project: Project;
    id: string;
    bookmarked: boolean;
    handleSelect: () => void;
    annotationText: string | null;
    selected: boolean;
    pagedOut: boolean;
    filteredOut: boolean;
}

const memoComparator = (p: Props, c: Props) => {
    return c.project.uid == p.project.uid && 
            c.annotationText == p.annotationText && 
            p.bookmarked == c.bookmarked  && 
            p.selected == c.selected &&
            p.pagedOut == c.pagedOut &&
            p.filteredOut == c.filteredOut
}

export const ProjectComponentBase = ({ 
    id, 
    project,  
    bookmarked, 
    annotationText, 
    selected, 
    handleSelect,
    pagedOut,
    filteredOut
} : Props) => {

    const cnamePag = pagedOut ? 'paged-out' : ''
    const cnameSel = selected ? 'selected' : ''
    const cnameFil = filteredOut ? 'filtered-out': ''

    const statusDesc = [...project.status]

    return <StyledJobContainer 
            id={ id } 
            className={ `${ cnamePag } ${ cnameSel } ${ cnameFil }` }
            onClick={ handleSelect }>
        {
            filteredOut ? <FilteredOutCardWarningComponent /> : null
        }
        <h2> 
            <span>
            {
                bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
            }
            { project.name }
            </span>
            <i className={ "fa fa-chevron-right" } />
        </h2>
        { annotationText ? <AnnotationsComponent note={ annotationText } /> : null }
        <h3>
            <RichTextParagraphComponent text={ project.notes } />
        </h3>
        <ul>
            <li className="itemised">
            { 
                statusDesc.map((ps, i) => <span  key={ i }><RichTextParagraphComponent text={ ps } />{ i < (statusDesc.length - 1) ? ', ' : '' }</span>)
            }
            </li>
        </ul>
    </StyledJobContainer>
}

export const ProjectComponent = React.memo(ProjectComponentBase, memoComparator)