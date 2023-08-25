import { ResourceType } from '../mobx-stores/resource-stores/main'

export abstract class AppResourceModel {

    uid: number
    resource_type: ResourceType

    static fromDoc() {}

    toString () {}
    display () {}
}