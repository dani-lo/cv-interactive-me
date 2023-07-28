import { AppState, AppstateKeys } from "../store/appState"
import { Annotation, Bookmark, Filter, Resource } from "../types"
import { NullableT, toNullableT } from "./nullable"

export const annotationForResource = (item: Resource, appstate: AppState) : Annotation | null => {
    
    const note = appstate[AppstateKeys.ANNOTATIONS].find((note) => {
        return note.resource_id == item.uid && note.resource_type == item.resource_type
    })
    
    return  note || null
}

export const filterForResource = (item: Resource, appstate: AppState) : Filter | null => {
    
    return appstate[AppstateKeys.FILTERS].find((cvFilter) => {
        return cvFilter.resource_id == item.uid && cvFilter.resource_type == item.resource_type
    }) || null
}

export const bookmarkForResource = (item: Resource, appstate: AppState) : Bookmark | null => {
    
    return appstate[AppstateKeys.BOOKMARKS].find((bookmark) => {
        return bookmark.resource_id == item.uid && bookmark.resource_type == item.resource_type
    }) || null
}