import React, { useEffect, useRef, useState } from 'react' 
import { CSSTransition } from 'react-transition-group';
import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { AnnotationsComponent } from '../widget/annotations'
import { TechListComponent } from '../widget/tech'

import { Resource } from "../../src/types"

import { 
    StyledJobDetail, 
} from '../../styles/main.styled'

import { Project } from '../../src/models/classes/Project'
import { RichTextParagraphComponent } from '../widget/richTextParagraph'
import { useAtom } from 'jotai';

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
    
    const nodeRef = useRef(null);

    const [inprop, setInprop] = useState(false)
    const [proj, setProj] = useState<null | Project>(null)

    useEffect(() => {
        setInprop(false)
        setTimeout(() => {
            setProj(project)
            setInprop(true)
        }, 220)
    }, [project])
    

    return <CSSTransition 
            nodeRef={nodeRef} 
            in={  inprop } 
            timeout={ 100 } 
            classNames="anime-fade-node">
                
            <StyledJobDetail ref={nodeRef} className="anime-fade-init"> 
                { proj !== null && proj.id == project.id? 
                <>
                    <h2> 
                        <span className="action-wrap" onClick={ () => showActions( proj ) }>
                            <i className="action fa fa-plus" />
                            <span>{ proj.name }</span>
                        </span>
                        {
                            bookmarked ? <i className="fa fa-bookmark bookmark" /> : null
                        }
                    </h2>
                    { annotationText ? <AnnotationsComponent note={ annotationText }/> : null }
                        <p className="proj-repo"><a href={ proj.repo } target="_blank" rel="noreferrer">Github Repo</a></p>
                        <ul>
                        {
                            proj.description.map((task: string, i: number) => {
                                return <li key={ task.replace(/\s/g, '') }>
                                    <RichTextParagraphComponent 
                                        text={ `${ task }${  i < proj.description.length - 1 ? ';' : '.' }` } 
                                    />
                                </li>
                            })
                        }
                        </ul>
                    <ul style={{ marginTop: 'var(--gap-huge)' }}>
                    { 
                        proj.status.map((ps, i) => <li key={ i }><RichTextParagraphComponent text={ ps } /></li>)
                    }
                    </ul>
                    <h4 style={{ marginTop: 'var(--gap-huge' }}>Tech</h4>
                    <TechListComponent
                        techs={ project.tech}
                        showActions={ showActions }
                    />
                </> : null
                }
                
            </StyledJobDetail>
        </CSSTransition>
}

export const ProjectDetailComponent = React.memo(
    ProjectDetailsComponentBase, 

    (p: Props, c: Props) => {
        return c.project.uid == p.project.uid && 
                c.annotationText == p.annotationText && 
                p.bookmarked == c.bookmarked
    }
)