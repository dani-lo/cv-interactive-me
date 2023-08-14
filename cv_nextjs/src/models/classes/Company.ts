import { ConcreteMdel } from '../model'

import  { transformData } from '../../helpers/transformData'

import { canAnnotate } from '../mixins/withAnnotate'
import { canBookmark } from '../mixins/withBookmark'
import { canLink } from '../mixins/withLink'

import { ICompany, IField, ResourceType } from '../../types'

import { Field } from './Field'



export class Company extends canAnnotate(canBookmark(canLink(ConcreteMdel))) {

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

    getSearchString () {

        const d = transformData(null)
        const jobModels = d.jobModels

        if (jobModels.size > 0) {

            const job = Array.from(jobModels.values()).find(j => j.company !== null && j.company.id == this.id)

            return `${ ResourceType.Job }s/${ job?.id }`.toLowerCase()
        }

        return ''      
    }
}