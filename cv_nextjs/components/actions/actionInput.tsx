import { useContext, useState } from 'react'
import styled from 'styled-components'
import { CvJobsContext } from '../../pages/_app'
import { annotationForResource, bookmarkForResource, filterForResource } from '../../src/helpers/actionForResource'
import { IAnnotate } from '../../src/models/mixins/withAnnotate'
import { IBookmark } from '../../src/models/mixins/withBookmark'
import { IFilter } from '../../src/models/mixins/withFilter'
import { Resource } from '../../src/types'

import { StyledActionInput } from '../../styles/styled'

export const FilterActionInput = (props: { 
        item: Resource, 
        active: boolean }) => {

    const { item } = props

    const ctx = useContext(CvJobsContext)
    
    if (!ctx) {
        return null
    }

    const active = props.active && !filterForResource(item, ctx.appstate)

    return <StyledActionInput active={ active }>
        <p>
            <strong>Filter by</strong> this item: this will filter out all jobs that do not include this item
        </p>
        <button onClick={ () => (item as IFilter).filter(ctx) }>add</button>
    </StyledActionInput>
}

export const BookmarkActionInput = (props: { 
            item: Resource, 
            active: boolean 
    }) => {

    const { item } = props

    const ctx = useContext(CvJobsContext)

    if (!ctx) {
        return null
    }

    const active = props.active && !bookmarkForResource(item, ctx.appstate)

    return <StyledActionInput active={ active }>
        <p>
            
            <strong>Bookmark</strong> this item
            
        </p>
        <button onClick={ () => (item as IBookmark).bookmark(ctx) }>add</button>
    </StyledActionInput>
}

export const AnnotateActionInput = (props: { 
        item: Resource, 
        active: boolean 
    }) => {

    const { item } = props
    
    const [note,setNote] = useState<string>("")
    
    const ctx = useContext(CvJobsContext)
    
    if (!ctx) {
        return null
    }
    
    const uiActive = props.active && !annotationForResource(item, ctx.appstate)
    const btnAddNoteActive = uiActive && note.length > 0
    
    return <StyledActionInput active={ uiActive }>
        <p>
            <strong>Annotate</strong> this item {`${ !uiActive ? ' (start typing to activate)' : ''  }`}
        </p>
        <textarea 
            disabled={!uiActive }  
            value={ note } 
            onChange={ (e) => setNote(e.target.value)}>
        </textarea>
        <p>
            <button 
                className={ btnAddNoteActive ? '' : 'disabled' } 
                onClick={ () => (item as IAnnotate).annotate(note, ctx) }>
            add
            </button>
        </p>
    </StyledActionInput>
}
