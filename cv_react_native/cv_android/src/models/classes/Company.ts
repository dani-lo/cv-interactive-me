import { Field } from './Field'
import { CvDataModel } from '../cvdataModel'

export interface ICompany {
    uid: number;
    name: string;
    description: string;
    field: number[];
}


export class Company extends CvDataModel {

    name: string
    uid: number 
    description: string
    field: Field[]

    constructor (doc: ICompany, fieldDocs: IField[]) {

        super()

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