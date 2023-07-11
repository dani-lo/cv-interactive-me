import { appActionIdentity } from "../helpers/appActionIdentity";
import { itemCanBePending } from "../helpers/typeNarrowers";
import { Filter, Annotation, Bookmark, Collectable, AppAction } from "../types";

export enum PendingStatus {
    'ADDED' = 'added',
    'DELETED' = 'deleted',
    'EDITED' = 'edited',
    'ADDED_THEN_EDITED' = 'addedEdited'
}

export type AppStatePending = { pending :  PendingStatus | null }

export enum AppstateKeys {
    'FILTERS' = 'filters',
    'ANNOTATIONS' = 'annotations',
    'BOOKMARKS' = 'bookmarks',
}

export type AppState = {
    [AppstateKeys.FILTERS]: (Filter &  AppStatePending & Collectable)[],
    [AppstateKeys.ANNOTATIONS]: (Annotation &  AppStatePending & Collectable)[],
    [AppstateKeys.BOOKMARKS]: (Bookmark &  AppStatePending & Collectable)[],
}

export enum AppStateAction {
    'ADD_ANNOTATION' = 'add-annotation',
    'ADD_BOOKMARK' = 'add-bookmark',
    'REMOVE_BOOKMARK' = 'remove-bookmark',
    'ADD_FILTER' = 'add-filter',
    'DELETE_ANNOTATION' = 'delete-annotation',
    'DELETE_FILTER' = 'delete-filter',
    'APPLY_PENDING' = 'apply_pending',
    'FLUSH_PENDING' = 'flush_pendifiltersng',
    'SAVE' = 'save',
    'LOAD_USER_STATE' = 'loadUserState',
    'REFRESH_PENDING' = 'refreshPending'
}

export type AppStatePayload = (Annotation | Bookmark | Filter) | AppState | null
export type AppStateLoad = AppState

export const initialState : AppState = {
    [AppstateKeys.FILTERS]: [],
    [AppstateKeys.ANNOTATIONS]: [],
    [AppstateKeys.BOOKMARKS]: [],
}

export function reducer(
    state : AppState, 
    action: {
        type: AppStateAction,
        payload: AppStatePayload 
    }) : AppState {
        
    switch (action.type) {

        case AppStateAction.ADD_ANNOTATION:
            return addAnnotation(state, action.payload as AppStatePayload)
        
        case AppStateAction.ADD_FILTER:
            return addFilter(state, action.payload as AppStatePayload)

        case AppStateAction.ADD_BOOKMARK:
            return addBookmark(state, action.payload as AppStatePayload)

        case AppStateAction.REMOVE_BOOKMARK:
            return removeBookmark(state, action.payload as AppStatePayload)

        case AppStateAction.DELETE_ANNOTATION:
            return removeAnnotation(state, action.payload as AppStatePayload)

        case AppStateAction.DELETE_FILTER:
            return removeFilter(state, action.payload as AppStatePayload)

        case AppStateAction.LOAD_USER_STATE:
            return action.payload !== null ?  loadUserState(action.payload as AppState) : state

        case AppStateAction.APPLY_PENDING:
            return applyPending(state)

        case AppStateAction.FLUSH_PENDING:
            return flushPending(state)

        case AppStateAction.REFRESH_PENDING:
            return refreshPending(state, action.payload as AppState)

        default:
            return state
    }

}
const refreshPending = (state: AppState, payload: AppState) => {

    const refreshStateReduce = (appStateKey: AppstateKeys) => function (

        acc: (AppAction & Collectable & AppStatePending)[],
        curr: AppAction & Collectable & AppStatePending
    ) {

        if (curr.pending == PendingStatus.DELETED) {
            return acc
        }

        const refreshed = payload[appStateKey].find(b => appActionIdentity(b, curr))

        if (refreshed) {
            acc.push(refreshed)
        } else {
            acc.push(curr)
        }

        return acc
    }

    return {
        [AppstateKeys.ANNOTATIONS]: state[AppstateKeys.ANNOTATIONS].reduce(refreshStateReduce(AppstateKeys.ANNOTATIONS), []),
        [AppstateKeys.BOOKMARKS]: state[AppstateKeys.BOOKMARKS].reduce(refreshStateReduce(AppstateKeys.BOOKMARKS), []),
        [AppstateKeys.FILTERS]: state[AppstateKeys.FILTERS].reduce(refreshStateReduce(AppstateKeys.FILTERS), []),
    }
}

const loadUserState = (payload: AppState) => {
    
    return { 
        [AppstateKeys.ANNOTATIONS] : payload[AppstateKeys.ANNOTATIONS]?.map(a => ({ ...a, pending: null })) || [],
        [AppstateKeys.FILTERS] : payload[AppstateKeys.FILTERS]?.map(f => ({ ...f, pending: null })) || [],
        [AppstateKeys.BOOKMARKS] : payload[AppstateKeys.BOOKMARKS]?.map(b => ({ ...b, pending: null })) || []
     }
}

const applyPendingItem = <T>(item: T) : T => ({ ...item, pending: null})
const applyPending = (state: AppState) : AppState => {

    const appliedState = {} as AppState

    const appstateEntries  = Object.entries(state)

    for (const [k, resources] of appstateEntries) {

        // @ts-ignore
        appliedState[k as keyof AppState] = resources.map(res => itemCanBePending(res) ? applyPendingItem(res) : res)
    }

    return {
        ...appliedState,
    }
}

const flushPending = (state: AppState) : AppState => { 

    const flushedState = {} as AppState
    const appstateEntries  = Object.entries(state)

    for (const [k, resources] of appstateEntries) {

        flushedState[k as keyof AppState] = resources
            .filter(res => itemCanBePending(res) && [PendingStatus.DELETED, null].includes(res.pending))
            .map(res => ({ ...res, pending: null }))
    }

    return {
        ...flushedState,
    }
}


const addAnnotation = (state: AppState, payload: AppStatePayload) : AppState => {

    const annotation = {...payload as Annotation & Collectable }
    const annotations = [...state[AppstateKeys.ANNOTATIONS]]

    const index = state[AppstateKeys.ANNOTATIONS].findIndex(a => {
        return appActionIdentity(a, annotation)
    })

    if (index == -1) {

        annotations.push({ ...annotation, pending: PendingStatus.ADDED})

        return {
            ...state,
            annotations
        }
    } else {

        return { 
            ...state,
            [AppstateKeys.ANNOTATIONS]: state[AppstateKeys.ANNOTATIONS].map((ann, i) => {

                return i === index ? 

                { ...ann, pending: ann.pending ===  PendingStatus.ADDED ? PendingStatus.ADDED_THEN_EDITED : PendingStatus.EDITED } : 
                { ...ann }
            })
        }
    }
}



const removeAnnotation = (state: AppState, payload: AppStatePayload) : AppState => {

    const annotation = {...payload as Annotation  & Collectable & AppStatePending}
    const index = state[AppstateKeys.ANNOTATIONS].findIndex(a => {
        return appActionIdentity(a, annotation)
    })

    if (index !== -1) {

        const existing = state[AppstateKeys.ANNOTATIONS][index]

        if (existing.pending === null) {

            return { 
                ...state,
                [AppstateKeys.ANNOTATIONS]: state[AppstateKeys.ANNOTATIONS].map((ann, i) => {
                    return appActionIdentity(ann, annotation) ? { ...ann, pending: PendingStatus.DELETED } : { ...ann }
                })
            }
        } else {
            
            
            return {
                ...state,
                [AppstateKeys.ANNOTATIONS]:  state[AppstateKeys.ANNOTATIONS].filter(a => !appActionIdentity(a, annotation))
            }
        }
        
    }

    return state
}

const addFilter = (state: AppState, payload: AppStatePayload) : AppState => {
    
    const filter = {...payload } as Filter  & Collectable & AppStatePending
    const filters = [...state[AppstateKeys.FILTERS]]

    filters.push({ ...filter, pending: PendingStatus.ADDED })

    return {
        ...state,
        filters
    }
}

const removeFilter = (state: AppState, payload: AppStatePayload) : AppState => {
    
    const filter = {...payload } as Filter  & Collectable & AppStatePending
    const index = state[AppstateKeys.FILTERS].findIndex(f => {
        return appActionIdentity(f, filter)
    })

    if (index !== -1) {

        const existing = state[AppstateKeys.FILTERS][index]
        
        if (existing.pending === null) {

            return { 
                ...state,
                [AppstateKeys.FILTERS]: state[AppstateKeys.FILTERS].map((f) => {
                    return appActionIdentity(filter, f) ? { ...f, pending: PendingStatus.DELETED } : { ...f }
                })
            }
            
        } else {
            
            return {
                ...state,
                [AppstateKeys.FILTERS]:  state[AppstateKeys.FILTERS].filter(f => !appActionIdentity(f, filter))
            }
        }
    }
    
    return state
}

const addBookmark = (state: AppState, payload: AppStatePayload) : AppState => {

    const bookmark = {...payload } as Bookmark  & Collectable & AppStatePending
    const bookmarks = [...state[AppstateKeys.BOOKMARKS]]

    bookmarks.push({ ...bookmark, pending: PendingStatus.ADDED })

    return {
        ...state,
        bookmarks
    }
}

const removeBookmark = (state: AppState, payload: AppStatePayload) : AppState => {

    const bookmark = {...payload } as Bookmark & Collectable & AppStatePending
    const index = state[AppstateKeys.BOOKMARKS].findIndex(b => {
        return appActionIdentity(b, bookmark)
    })

    if (index !== -1) {

        const existing = state[AppstateKeys.BOOKMARKS][index]

        if (existing.pending == null) {

            return { 
                ...state,
                [AppstateKeys.BOOKMARKS]: state[AppstateKeys.BOOKMARKS].map((b, i) => {
                    return appActionIdentity(b, bookmark) ? { ...b, pending: PendingStatus.DELETED } : { ...b }
                })
            }
        } else {
            
            

            return {
                ...state,
                [AppstateKeys.BOOKMARKS]:  state[AppstateKeys.BOOKMARKS].filter(b => !appActionIdentity(b, bookmark))
            }
        }

    }
    
    return state
}