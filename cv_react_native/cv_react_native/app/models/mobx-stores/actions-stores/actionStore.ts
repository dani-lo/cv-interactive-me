import { makeAutoObservable } from "mobx"

import { Filter } from "./filter"
import { ActionType } from "./main"

import { AppResourceModel } from "app/models/cv-resources/model"

import { ResourceType } from '../resource-stores/main'

import { PendingStatus, ApiActionResult } from "../.././../types"

export class CvAction {

    gone: boolean = false
    actionType: ActionType

    constructor (
            private _id: string,
            private resource_id: number, 
            private resource_type: ResourceType,
            private pending: PendingStatus,
            protected store: CvActionStore,
            actionType: ActionType) {
        
        this.actionType = actionType

        makeAutoObservable(this)
    }

    async update() : Promise<ApiActionResult<CvAction>> {
        // 
        try {
            const res: ApiActionResult<CvAction> = {
                status: '',
                data: []
            }
            return Promise.resolve(res)
        } catch(err) {
            return Promise.reject(err)
        }
        
    }

    get asJson() {
        return {
            _id: this._id,
            resourceId: this.resource_id,
            resourceType: this.resource_type,
            pending: this.pending
        }
    }

    nuke () {
        this.gone = true
    }

    gettargetResource (resources: Map<ActionType, AppResourceModel[]>) {

        try {
            return resources.get(this.actionType).find(
                (d) => d.resource_type == ResourceType.Job && d.uid == this.resource_id
            )
        } catch (err) {
            throw(err)
        }
    }
}

export class CvActionStore {

    filters: Filter[]

    constructor () {
        this.filters = []
    }

    addFilter (f: Filter) {
        this.filters.push(f)
    }

    removeFilter (f: Filter) {
        this.filters.push(f)
    }

    persistAction (act: CvAction) {
        //
        const res = act.update()
    }
}