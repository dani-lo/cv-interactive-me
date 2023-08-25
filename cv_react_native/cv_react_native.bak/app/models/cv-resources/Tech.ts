import { ITech } from "app/services/api"
import { AppResourceModel } from "./model"

import { ResourceType } from '../mobx-stores/resource-stores/main'

export class Tech implements AppResourceModel {

    uid: number 
    resource_type: ResourceType = ResourceType.Tech

    name: string

    constructor (doc: ITech) {

        this.name = doc.name
        this.uid = doc.uid
    }

    toString() : string {
        return this.name
    }

    display() {
        return true
    }
}

