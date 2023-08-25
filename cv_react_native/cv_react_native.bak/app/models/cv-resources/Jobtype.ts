import {  IJobType } from "app/services/api"
import { AppResourceModel } from "./model"

import { ResourceType } from '../mobx-stores/resource-stores/main'

export type JobtypePrefix = "PLACE" |  "TIME"

export class JobType  implements AppResourceModel {

    uid: number
    resource_type: ResourceType = ResourceType.Jobtype

    name: string    
    prefix: JobtypePrefix 

    static fromDoc(jobtypeDoc: IJobType) {
        return new JobType(jobtypeDoc)
    }

    constructor (doc: IJobType) {
        // super(doc.uid, ResourceType.FIELD)

        this.name = doc.name
        this.uid = doc.uid
        this.prefix = doc.prefix
    }

    toString() : string {
        return this.name
    }

    display() {
        return true
    }
}