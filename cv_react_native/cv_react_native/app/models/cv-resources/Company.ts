import { ICompany, IField } from 'app/services/api'
import { Field } from './Field'
import { AppResourceModel } from './model'

import { ResourceType } from '../mobx-stores/resource-stores/main'

export class Company implements AppResourceModel {

   
    uid: number 
    resource_type: ResourceType = ResourceType.Company

    name: string
    description: string
    field: Field[]

    static fromDoc(doc: ICompany, fieldDoc: IField[]) {
        return new Company(doc, fieldDoc)
    }

    constructor (doc: ICompany, fieldDoc: IField[]) {
        // super(doc.uid, ResourceType.COMPANY)

        this.name = doc.name
        this.uid = doc.uid
        this.description = doc.description
        this.field = fieldDoc.map(f => new Field(f))
    }

    toString() : string {
        return this.name
    }

    display () {
        return true
    }
}