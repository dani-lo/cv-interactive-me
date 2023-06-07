import React, { useContext } from "react";
import { CvJobsContext } from "../../pages/_app";
import { itemCanAnnotate, itemCanBookmark, itemCanFilter } from "../helpers/typeNarrowers";
import { Resource } from "../types";

const withResourceInlineActions = (Wrapped: any) => function WithResourceInlineActionsWapper (props: any & { resource: Resource }) {

    const ctx = useContext(CvJobsContext)

    if (ctx == null) {
        return <Wrapped { ...props} />
    }

    return <span className="with-inline-actions">
        {
            itemCanAnnotate(props.resource) ? <span onClick={() => props.resource.annotate('') }>ann + </span> : null
        }
        {
            itemCanFilter(props.resource) ? <span onClick={() => props.resource.filter(ctx) }>ann + </span> : null
        }
        {
            itemCanBookmark(props.resource) ? <span onClick={() => props.resource.bookmark(ctx) }>ann + </span> : null
        }
        <Wrapped { ...props} />
    </span>
}


const withResourceBlockActions = (Wrapped: any) => function WithResourceBlockActionsWapper (props: any & { resource: Resource }) {

    const ctx = useContext(CvJobsContext)

    if (ctx == null) {
        return <Wrapped { ...props} />
    }

    return <div className="with-inline-actions">
        {
            itemCanAnnotate(props.resource) ? <span onClick={() => props.resource.annotate('') }>ann + </span> : null
        }
        {
            itemCanFilter(props.resource) ? <span onClick={() => props.resource.filter(ctx) }>ann + </span> : null
        }
        {
            itemCanBookmark(props.resource) ? <span onClick={() => props.resource.bookmark(ctx) }>ann + </span> : null
        }
        <Wrapped { ...props} />
    </div>
}

export {
    withResourceInlineActions,
    withResourceBlockActions
}