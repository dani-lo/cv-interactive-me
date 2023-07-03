import React from 'react';
import { StyledAnnotation } from '../../styles/main.styled'

type AnnotationProps = {
    note: string;
}

const AnnotationsComponentBase  = ({ note }: AnnotationProps) => {
    
    return <StyledAnnotation>
        <p>{ note }</p>
    </StyledAnnotation>
}

export const AnnotationsComponent = React.memo<AnnotationProps>(
    AnnotationsComponentBase, 
    (p: AnnotationProps, c: AnnotationProps) => p.note !== c.note
)