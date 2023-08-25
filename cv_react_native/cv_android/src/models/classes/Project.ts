import { ConcreteMdel, Model } from '../model'

import { canAnnotate } from '../mixins/withAnnotate'
import { canBookmark } from '../mixins/withBookmark'

import {  ResourceType, WithUid, IProject } from '../../types'
import { Tech } from './Tech'

import { Filter } from '../../types'
import { AppStatePending, PendingStatus } from '../../store/appState'
import { allFiltersForDisplay } from '../../helpers/allFiltersForDisplay'
import { canLink } from '../mixins/withLink'
import { JobPeriod } from './Period'

export class Project extends canAnnotate(canBookmark(canLink(ConcreteMdel))) implements WithUid {

    uid: number 
    description: string[]
    name: string
    liveUrl: string 
    status: string[]
    tech: Tech[]
    repo: string
    notes:string
    period: JobPeriod

    constructor (
            doc: IProject,
            techModels: Map<number, Tech>
        ) {

        super(doc.uid, ResourceType.Project)
        
        this.repo = doc.repo
        this.uid = doc.uid
        this.name = doc.name
        this.description = doc.description
        this.status = doc.status
        this.liveUrl = doc.live_url
        this.notes = doc.notes
        
        this.period = new JobPeriod(doc.from, doc.to)
        
        this.tech = doc.tech.map(techUid => techModels.get(techUid)).filter(techModel => !!techModel) as Tech[]
    }

    toString () {
        return this.name
    }

    toUrl () {
        return 'projects'
    }

    display (appstateFilters:( Filter & AppStatePending)[]) {

        const techFiltersIDs = allFiltersForDisplay(appstateFilters)
            .filter(f => f.resource_type == ResourceType.Tech)
            .map(f => f.resource_id)
            
        const projectTechsIDs = this.tech.map(t => {
            return t.uid
        })

        if  (techFiltersIDs.length && !techFiltersIDs.every(value => projectTechsIDs.includes(value))) {
            return false
        }

        return true
    }   
}