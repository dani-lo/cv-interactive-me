import { IField } from "app/services/api"
import { AppResourceModel } from "./model"

import { ResourceType } from '../mobx-stores/resource-stores/main'

export class Field  implements AppResourceModel {

    uid: number
    resource_type: ResourceType = ResourceType.Field

    name: string

    static fromDoc(fieldDoc: IField) {
        return new Field(fieldDoc)
    }

    constructor (doc: IField) {
        // super(doc.uid, ResourceType.FIELD)

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