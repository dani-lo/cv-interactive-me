import { Job } from '../models/classes/Job'
import { Project } from '../models/classes/Project'
import { AppStatePending } from '../store/appState'
import { Filter } from '../types'

export const filteredOut = (
        modelItem: Project | Job, 
        filters: null | ( Filter & AppStatePending)[]) => {
            
    return !!(filters && !modelItem.display(filters))
}

export const pagedOut = (currPage: number, iitemIndex: number, pageSize: number) => {
    return iitemIndex < (pageSize * currPage) || iitemIndex >= ((pageSize * (currPage + 1)))
}