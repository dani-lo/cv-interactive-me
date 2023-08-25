// import { ConcreteMdel, Model } from '../model'

// import { canAnnotate } from '../mixins/withAnnotate'
// import { canBookmark } from '../mixins/withBookmark'
// import { canLink } from '../mixins/withLink'

// import {  ResourceType, WithUid, IProject } from '../../types'
// import { Tech } from './Tech'

// import { Filter } from '../../types'
// import { AppStatePending, PendingStatus } from '../../store/appState'
// import { allFiltersForDisplay } from '../../helpers/allFiltersForDisplay'

// export class Project extends canAnnotate(canBookmark(canLink(ConcreteMdel))) implements WithUid {

//     uid: number 
//     description: string[]
//     name: string
//     liveUrl: string 
//     status: string[]
//     tech: Tech[]
//     repo: string

//     constructor (
//             doc: IProject,
//             techModels: Map<number, Tech>
//         ) {

//         super(doc.uid, ResourceType.JOB)
        
//         this.repo = doc.repo
//         this.uid = doc.uid
//         this.name = doc.name
//         this.description = doc.description
//         this.status = doc.status
//         this.liveUrl = doc.live_url
        
//         this.tech = [4, 11, 33].map(techUid => techModels.get(techUid)).filter(techModel => !!techModel) as Tech[]
//     }

//     toString () {
//         return this.name
//     }

//     display (appstateFilters:( Filter & AppStatePending)[]) {

//         const techFiltersIDs = allFiltersForDisplay(appstateFilters)
//             .filter(f => f.resourceType == ResourceType.TECH)
//             .map(f => f.resourceId)
            
//         const projectTechsIDs = this.tech.map(t => {
//             return t.uid
//         })

//         if  (techFiltersIDs.length && !techFiltersIDs.every(value => projectTechsIDs.includes(value))) {
//             return false
//         }

//         return true
//     }   
// }