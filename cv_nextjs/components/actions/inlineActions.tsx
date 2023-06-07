import { useContext, useState } from "react";
import styled from 'styled-components'

import { CvJobsContext } from "../../pages/_app"

import * as narrowers from '../../src/helpers/typeNarrowers'
import { annotationForResource } from "../../src/helpers/actionForResource"

import { Resource } from '../../src/types'

import { IFilter, IFilterKeys } from '../../src/models/mixins/withFilter'
import { IBookmark, IBookmarkKeys } from '../../src/models/mixins/withBookmark'
import { IAnnotate, IAnnotateKeys } from '../../src/models/mixins/withAnnotate'

const StyledInlineAction = styled.span<{active: boolean}>`
  ${ props => props.active == false ? 'opacity: 0.6;cursor: default;pointer-events: none;' : 'cursor: pointer;' }
`

type Props = { 
  item: Resource;
}

export const BlockActions = (props: Props) => {

    const [noteactive, setNoteactive] = useState(false)
    // const [note, setNote] = useState('')
    const ctx = useContext(CvJobsContext)

    if (ctx == null) {
        return null
    }

    const { item } = props

    const annotation = annotationForResource(item, ctx.appstate) || null

    return <div className="block-actions">
        <StyledInlineAction 
            active={ narrowers.itemCanFilter(item) } 
            onClick={ () => {
                narrowers.itemCanFilter(item) && (item as IFilter).filter(ctx)
            }}
        >
        </StyledInlineAction> 
        <StyledInlineAction 
            active={ narrowers.itemCanBookmark(item) } 
            onClick={ () => {
                    narrowers.itemCanBookmark(item) && (item as IBookmark).bookmark(ctx)
            }}
        >
        </StyledInlineAction> 
        <StyledInlineAction 
            active={ narrowers.itemCanFilter(item) } 
            onClick={ () => {
                narrowers.itemCanAnnotate(item) && setNoteactive(!noteactive)
            }}
        >
        </StyledInlineAction> 
        { 
            narrowers.itemCanAnnotate(item) ? 
                noteactive ?
                    <div className="annotation">
                        <textarea 
                            value={ annotation?.text || '' } 
                            onChange={ (e) => (item as IAnnotate).annotate(e.target.value, ctx)}>
                        </textarea>
                    </div> : 
                    !!annotation?.text ?  
                        <div className="annotation">
                            <p>{ annotation.text } </p>
                        </div> :
                        null :
                null
        }
    </div>   
}

export const InlineActions = (props: Props) => {

    const ctx = useContext(CvJobsContext)

    if (ctx == null) {
        return null
    }

    const { item } = props

    return <div className="inline-actions">
        <StyledInlineAction 
            active={ narrowers.itemCanFilter(item) } 
            onClick={ () => {
                narrowers.itemCanFilter(item) && (item as IFilter).filter(ctx)
            }}
        >
        </StyledInlineAction> 
        <StyledInlineAction 
            active={ narrowers.itemCanBookmark(item) } 
            onClick={ () => {
                    narrowers.itemCanBookmark(item) && (item as IBookmark).bookmark(ctx)
            }}
        >
        </StyledInlineAction> 
        <StyledInlineAction 
            active={ false } 
        >
        </StyledInlineAction> 
        
    </div>   
}