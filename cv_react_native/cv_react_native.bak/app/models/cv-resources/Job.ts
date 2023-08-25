
import { Company } from './Company'
import { Tech } from './Tech'
import { JobPeriod } from './Period'
import { JobType } from './Jobtype'
import { Field } from './Field'
import { AppResourceModel } from './model'
import { IJob } from 'app/services/api'

import { ResourceType } from '../mobx-stores/resource-stores/main'

export class Job implements AppResourceModel {

    uid: number 
    resource_type: ResourceType = ResourceType.Job

    description: string[]
    title: string
    position: string
    
    company: Company | null
    tech: Tech[]
    period: JobPeriod
    jobType: JobType[]

    static fromDoc(
        doc: IJob, 
        techModels: Map<number, Tech>,
        jobTypeModels: Map<number, JobType>,     
        companyModels : Map<number, Company>
    ) {
        return new Job(
            doc, 
            techModels,
            jobTypeModels,     
            companyModels
        )
    }

    constructor (
            doc: IJob, 
            techModels: Map<number, Tech>,
            jobTypeModels: Map<number, JobType>,     
            companyModels : Map<number, Company>,    
        ) {

        // super(doc.uid, ResourceType.JOB)

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

    display() {
        return true
    }
}