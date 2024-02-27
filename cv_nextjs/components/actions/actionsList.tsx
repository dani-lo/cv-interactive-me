import { useContext } from "react"

import { CvJobsContext } from "../../pages/_app"

import { groupBy } from "../../src/helpers/groupBy"
import { grabMappedResource, transformData } from "../../src/helpers/transformData"

import { IAnnotate, IAnnotateKeys } from "../../src/models/mixins/withAnnotate"
import { IBookmark, IBookmarkKeys } from "../../src/models/mixins/withBookmark"
import { IFilter, IFilterKeys } from "../../src/models/mixins/withFilter"

import { AppStatePending, PendingStatus } from "../../src/store/appState"

import { AppAction, AppDataProps, Collectable, Resource, ResourceType } from "../../src/types"

import { StyledActionsList } from "../../styles/main.styled"
import { ActionLink } from "./actionLink"
import { filteredOut } from "../../src/helpers/displayItemFilters"
import { Job } from "../../src/models/classes/Job"
import { Project } from "../../src/models/classes/Project"

const filterLabel = (resource: Resource & IFilter) : string => {
    if (resource.toLabel() == '') {
        return resource.resource_type
    }
    
    return resource.toLabel()
}

export const ActionsList = (props: AppDataProps) => {

    const ctx = useContext(CvJobsContext)
    
    if (!ctx) {
        return null
    }

    const mappedResources = transformData(props)

    const activeFilter = (ctx.appstate.filters || []).filter(b => {
        return b.pending === null || ![PendingStatus.DELETED].includes(b.pending)
    })

    const activeBookmarks = (ctx.appstate.bookmarks || []).filter(b => {
        return b.pending === null || ![PendingStatus.DELETED].includes(b.pending)
    })

    const activeAnnotations = (ctx.appstate.annotations || []).filter(b => {
        return b.pending === null || ![PendingStatus.DELETED, PendingStatus.ADDED_THEN_EDITED].includes(b.pending)
    })
    
    return <>
        <div>
            <h3>Your Filters</h3> 
            <StyledActionsList>
            { 
                activeFilter.length ? 
                    groupBy(ctx.appstate.filters, 'resource_type')
                        .map((appFilter) => {

                            if (appFilter.pending === PendingStatus.DELETED) {
                                return null
                            }

                            const resources = grabMappedResource(appFilter.resource_type, mappedResources)
                            const resource = resources.get(appFilter.resource_id) as Resource & IFilter

                            return <li key={ `${appFilter.resource_type}-${appFilter.resource_id}` } className="action-wrap">
                                <span>
                                    <strong className="capital">{ filterLabel(resource) }</strong>: 
                                    <ActionLink resource={ resource } />
                                </span>
                                <i className="action fa fa-times" onClick={ () => resource[IFilterKeys.UNDO_ACTION](ctx) } />
                            </li>
                    }) :
                    <p>To add filters please use the plus action button (<i className="fa fa-plus" />) within filterable CV items</p>
            }
            </StyledActionsList>
        </div>
        <div>
            <h3>Your Bookmarks</h3> 
            <StyledActionsList>
            {
                activeBookmarks.length ?
                    groupBy(ctx.appstate.bookmarks, 'resource_type').map((appBookmark) => {

                        if (appBookmark.pending === PendingStatus.DELETED) {
                            return null
                        }

                        const resources = grabMappedResource(appBookmark.resource_type, mappedResources)
                        const resource = resources.get(appBookmark.resource_id)  as Resource & IBookmark
                        
                        const filtered= [ResourceType.Job, ResourceType.Project].includes( resource.resource_type) ? 
                            filteredOut(resource as Job | Project, ctx.appstate.filters || null) : 
                            false

                        return <li key={ `${appBookmark.resource_type}-${appBookmark.resource_id}`} className={ `${ filtered ? 'action-wrap action-filtered-out' : 'action-wrap' }` }>
                                <span>
                                    <strong className="capital">{ appBookmark.resource_type }</strong>: 
                                    <ActionLink resource={ resource } />
                                </span>
                                <i className="action fa fa-times" onClick={ () => resource[IBookmarkKeys.UNDO_ACTION](ctx) } />
                            </li>
                    }) :
                    <p>To add bookmarks please use action button (<i className="fa fa-plus" />) within bookmarkable CV items</p>
            }
            </StyledActionsList>
        </div>
        <div>
            <h3>Your Notes</h3> 
            <StyledActionsList>
            {   activeAnnotations.length ?
                    groupBy(ctx.appstate.annotations, 'resource_type').map((appNote) => {

                        if (appNote.pending === PendingStatus.DELETED) {
                            return null
                        }

                        const resources = grabMappedResource(appNote.resource_type, mappedResources)
                        const resource = resources.get(appNote.resource_id) as Resource & IAnnotate
                        
                        const filtered= [ResourceType.Job, ResourceType.Project].includes( resource.resource_type) ? 
                            filteredOut(resource as Job | Project, ctx.appstate.filters || null) : 
                            false

                        return <li key={ `${appNote.resource_type}-${appNote.resource_id}`} className={ `${ filtered ? 'action-wrap action-filtered-out' : 'action-wrap' }` }>
                            <span>
                                <strong className="capital">{ appNote.resource_type }</strong>: 
                                <ActionLink resource={ resource } />
                            </span>
                            <i className="action fa fa-times" onClick={ () => resource[IAnnotateKeys.UNDO_ACTION](ctx) } />    
                        </li>
                    }) :
                    <p>To add notes please use the action button (<i className="fa fa-plus" />) within annotateable CV items</p>
            }
            </StyledActionsList>
        </div>
    </>
}