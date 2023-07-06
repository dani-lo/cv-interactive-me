import { ConcreteMdel } from '../model'

import { canAnnotate } from '../mixins/withAnnotate'
import { canBookmark } from '../mixins/withBookmark'

import { ICompany, IField, ResourceType } from '../../types'

import { Field } from './Field'


export class Company extends canAnnotate(canBookmark(ConcreteMdel)) {

    name: string
    declare uid: number 
    declare description: string
    declare field: Field[]

    constructor (doc: ICompany, fieldDocs: IField[]) {
        super(doc.uid, ResourceType.Company)

        this.name = doc.name
        this.uid = doc.uid
        this.description = doc.description
        this.field =  fieldDocs.filter(fdoc => doc.field.includes(fdoc.uid)).map(fdoc => new Field(fdoc))
    }

    toString() : string {
        return this.name
    }
}