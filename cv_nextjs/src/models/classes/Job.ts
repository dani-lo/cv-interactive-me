import { ConcreteMdel, Model } from '../model'

import { canAnnotate } from '../mixins/withAnnotate'
import { canBookmark } from '../mixins/withBookmark'

import {  IJob, ResourceType, CvContext, WithUid } from '../../types'
import { Company } from './Company'
import { Tech } from './Tech'
import { JobPeriod } from './Period'
import { JobType } from './JobType'
import { Field } from './Field'

import { Filter } from '../../types'
import { AppStatePending, PendingStatus } from '../../store/appState'
import { allFiltersForDisplay } from '../../helpers/allFiltersForDisplay'

export class Job extends canAnnotate(canBookmark(ConcreteMdel)) implements WithUid {

    uid: number 
    description: string[]
    title: string
    position: string
    
    company: Company | null
    tech: Tech[]
    period: JobPeriod
    jobType: JobType[]

    constructor (
            doc: IJob, 
            techModels: Map<number, Tech>,
            jobTypeModels: Map<number, Field>,     
            companyModels : Map<number, Company>,    
        ) {

        super(doc.uid, ResourceType.Job)

        this.uid = doc.uid
        this.title = doc.title
        this.description = doc.description
        this.position = doc.position
        this.period = new JobPeriod(doc.from, doc.to)

        this.tech = doc.tech.map(techUid => techModels.get(techUid)).filter(techModel => !!techModel) as Tech[]
        this.company = doc.company ? companyModels.get(doc.company) || null : null
        
        this.jobType = doc.jobType.map(jtUid =>jobTypeModels.get(jtUid)) as JobType[]
    }

    toString () {
        return this.period.formatted
    }

    display (appstateFilters:( Filter & AppStatePending)[]) {

        const techFiltersIDs = allFiltersForDisplay(appstateFilters)
            .filter(f => f.resource_type == ResourceType.Tech)
            .map(f => f.resource_id)
            
        const jobTechsIDs = this.tech.map(t => {
            return t.uid
        })

        if  (techFiltersIDs.length && !techFiltersIDs.every(value => jobTechsIDs.includes(value))) {
            return false
        }

        const fieldFiltersIDs = allFiltersForDisplay(appstateFilters)
            .filter(f => f.resource_type == ResourceType.Field)
            .map(f => f.resource_id)

        const jobFieldsIDs = this.company?.field.map(t => t.uid) || []

        if  (fieldFiltersIDs.length && !fieldFiltersIDs.some(value => jobFieldsIDs.includes(value))) {
            return false
        }

        const jobtypeFiltersIDs = allFiltersForDisplay(appstateFilters)
            .filter(f => f.resource_type == ResourceType.JobType)
            .map(f => f.resource_id)
        
        const jobTypesIDs = this.jobType.map(t => t.uid) || []

        if  (jobtypeFiltersIDs.length && !fieldFiltersIDs.some(value => jobTypesIDs.includes(value))) {
            return false
        }

        return true
    }   

    toUrl () {
        return 'jobs'
    }
}