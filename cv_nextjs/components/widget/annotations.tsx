import React from 'react';
import { StyledJobAnnotations} from '../../styles/main.styled'

type AnnotationProps = {
    note: string;
}

const AnnotationsComponentBase  = ({ note }: AnnotationProps) => {
    
    return <StyledJobAnnotations>{ note }</StyledJobAnnotations>
}

export const AnnotationsComponent = React.memo<AnnotationProps>(
    AnnotationsComponentBase, 
    (p: AnnotationProps, c: AnnotationProps) => p.note !== c.note
)