import axios, { AxiosResponse } from 'axios'

import { getUser } from './getUser'

import { User } from '../../src/models/classes/User'

import { AppState, AppstateKeys, AppStatePending, PendingStatus } from '../../src/store/appState'

import { URL_ACTIONS } from '../../src/config'

import { 
    Collectable, 
    Filter, 
    Bookmark, 
    Annotation 
} from '../../src/types'


type ActionAPiResponse<T> = AxiosResponse<{ data: { [k in AppstateKeys]: T } }, any>

export const getUserFilters = async (
        apiUser ?: User & Collectable
    ) : Promise<ActionAPiResponse<(Filter & Collectable)[]>> => {
    
    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {
        return axios.get(`${ URL_ACTIONS.FILTERS }/${ user._id }`)
    } catch (err) {

        console.log(err)

        throw new Error('Error getting user filters')
    }
}

export const addUserFilter = async (
        filter: Filter & Collectable, 
        apiUser ?: User & Collectable
    ) : Promise<Filter & Collectable> =>  {
    
    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        const postFilterResponse = await axios.post(
            URL_ACTIONS.FILTERS, 
            new URLSearchParams({
                resource_type: filter.resource_type,
                resource_id: `${ filter.resource_id }`,
                userId: user._id
            })
        )
                
        return postFilterResponse.data.data.filter
    } catch (err) {

        console.log(err)

        throw new Error('Error posting user filters')
    }
}

export const deleteUserFilter = async (
    filter: Filter & Collectable, 
    apiUser ?: User & Collectable
) : Promise<boolean> =>  {

    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        await axios.delete(`${ URL_ACTIONS.FILTERS }/${ filter._id }`)
                
        return true
    } catch (err) {

        console.log(err)

        throw new Error('Error deleting user filters')
    }
}


export const getUserBookmarks = async (
        apiUser ?: User & Collectable
    ) : Promise<ActionAPiResponse<(Bookmark & Collectable)[]>> => {
    
    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        return axios.get(`${ URL_ACTIONS.BOOKMARKS }/${ user._id }`)
    } catch (err) {

        console.log(err)

        throw new Error('Error getting user bookmarks')
    }
}

export const addUserBookmark = async (
        bookmark: Bookmark & Collectable, 
        apiUser ?: User & Collectable
    ) : Promise<Bookmark & Collectable> =>  {

    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

        try {

        const postBookmarkResponse = await axios.post(
            URL_ACTIONS.BOOKMARKS, 
            new URLSearchParams({
                resource_type: bookmark.resource_type,
                resource_id: `${ bookmark.resource_id }`,
                userId: user._id
            })
        )
                
        return postBookmarkResponse.data.data.bookmark
    } catch (err) {

        console.log(err)

        throw new Error('Error posting user bookmarks')
    }
}

export const deleteUserBookmark = async (
    bookmark: Bookmark & Collectable, 
    apiUser ?: User & Collectable
) : Promise<boolean> =>  {

    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        await axios.delete(`${ URL_ACTIONS.BOOKMARKS }/${ bookmark._id }`)
                
        return true
    } catch (err) {

        console.log(err)

        throw new Error('Error deleting user bookmark')
    }
}

export const getUserAnnotations = async (
        apiUser ?: User & Collectable
    ) : Promise<ActionAPiResponse<(Annotation & Collectable)[]>> => {
    
    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        return axios.get(`${ URL_ACTIONS.ANNOTATIONS }/${ user._id }`)
    } catch (err) {

        console.log(err)
        
        throw new Error('Error getting user annotations')
    }
}

export const addUserAnnotation = async (
        annotation: Annotation & Collectable, 
        apiUser ?: User & Collectable
    ) : Promise<Annotation & Collectable> =>  {
    
    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        const postAnnotationResponse = await axios.post(
            URL_ACTIONS.ANNOTATIONS, 
            new URLSearchParams({
                resource_type: annotation.resource_type,
                resource_id: `${ annotation.resource_id }`,
                userId: user._id,
                text : annotation.text || ''
            })
        )
                
        return postAnnotationResponse.data.data.annotation
    } catch (err) {

        console.log(err)
        
        throw new Error('Error posting user annotations')
    }
}

export const editUserAnnotation = async (
    annotation: Annotation & Collectable, 
    apiUser ?: User & Collectable
) : Promise<Annotation & Collectable> =>  {

const user = apiUser || await getUser()

    if (!user._id) {
    throw new Error('Can not invoke actions api if user is not logged')
}

try {

    const postAnnotationResponse = await axios.patch(
        `${ URL_ACTIONS.ANNOTATIONS }/${ annotation._id }`,
        new URLSearchParams({
            text : annotation.text || ''
        })
    )
            
    return postAnnotationResponse.data.data.annotation
} catch (err) {

        console.log(err)
        
        throw new Error('Error patching user annotations')
}
}

export const deleteUserAnnotation = async (
    annotation: Annotation & Collectable, 
    apiUser ?: User & Collectable
) : Promise<boolean> =>  {

    const user = apiUser || await getUser()

    if (!user._id) {
        throw new Error('Can not invoke actions api if user is not logged')
    }

    try {

        await axios.delete(`${ URL_ACTIONS.ANNOTATIONS }/${ annotation._id }`)
                
        return true
    } catch (err) {

        console.log(err)
        
        throw new Error('Error deleting user annotations')
    }
}

export const getAppstateActionsData = async () => {

    const user = await getUser()

    try {

        const responses = await Promise.all([
            getUserBookmarks(user),
            getUserFilters(user),
            getUserAnnotations(user)
        ]) 

        return {
            [AppstateKeys.BOOKMARKS] :      responses[0]?.data.data[AppstateKeys.BOOKMARKS] || [],
            [AppstateKeys.FILTERS] :        responses[1]?.data.data[AppstateKeys.FILTERS] || [],
            [AppstateKeys.ANNOTATIONS] :    responses[2]?.data.data[AppstateKeys.ANNOTATIONS] || [],
        }
    } catch (err) {

        console.log(err)

        return []
    }
}

export const persistAppstateActionsData = async (appstate: AppState) : Promise<AppState> => {
    
    const user = await getUser()

    const pendingFilters = appstate[AppstateKeys.FILTERS].filter(f => f.pending !== null)
    const pendingFiltersPromises = pendingFilters?.length ? pendingFilters.map(pf => {
        
        if (pf.pending == PendingStatus.ADDED) {
            return addUserFilter(pf, user)
        }
        return deleteUserFilter(pf, user)
    }) : null

    const pendingBookmarks = appstate[AppstateKeys.BOOKMARKS].filter(b => b.pending !== null)
    const pendingBookmarksPromises = pendingBookmarks?.length ? pendingBookmarks.map(pb => {
        
        if (pb.pending == PendingStatus.ADDED) {
            return addUserBookmark(pb, user)
        }
        return deleteUserBookmark(pb, user)
    }) : null

    const pendingNotes = appstate[AppstateKeys.ANNOTATIONS].filter(a => a.pending !== null)
    const pendingNotesPromises = pendingNotes?.length ? pendingNotes.map(pa => {
        
        if (pa.pending == PendingStatus.ADDED || pa.pending == PendingStatus.ADDED_THEN_EDITED) {
            return addUserAnnotation(pa, user)
        } else if (pa.pending == PendingStatus.EDITED) {
            return editUserAnnotation(pa, user)
        }
        return deleteUserAnnotation(pa, user)
    }) : null

    try {
        
        const filtersApiResponses =  pendingFiltersPromises !== null ? await Promise.all(pendingFiltersPromises) : []
        const bookmarksApiResponses = pendingBookmarksPromises !== null ? await Promise.all(pendingBookmarksPromises) : []
        const annotationsApiResponses = pendingNotesPromises !== null ? await Promise.all(pendingNotesPromises) : []

        const freshFilters = filtersApiResponses.filter(f => typeof f !== 'boolean') as (Filter & Collectable & AppStatePending)[]
        const freshBookmarks = bookmarksApiResponses.filter(b => typeof b !== 'boolean') as (Bookmark & Collectable & AppStatePending)[]
        const freshNotes = annotationsApiResponses.filter(a => typeof a !== 'boolean') as (Annotation & Collectable & AppStatePending)[]

        return {
            [AppstateKeys.FILTERS]: freshFilters.map(f => ({ ...f, pending: null })),
            [AppstateKeys.BOOKMARKS]: freshBookmarks.map(b => ({ ...b, pending: null })),
            [AppstateKeys.ANNOTATIONS]: freshNotes.map(a => ({ ...a, pending: null }))
        }
    
    } catch (err) {
        console.log(err)
    }

    return {
        [AppstateKeys.FILTERS]: [],
        [AppstateKeys.BOOKMARKS]: [],
        [AppstateKeys.ANNOTATIONS]: []
    }
}