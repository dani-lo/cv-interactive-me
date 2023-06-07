import { ConcreteMdel } from '../model'

import { canAnnotate } from '../mixins/withAnnotate'
import { canBookmark } from '../mixins/withBookmark'
import { AppAction, Filter, ICompany, IField, ResourceType } from '../../types'
import { Field } from './Field'
import { AppStatePending } from '../../store/appState'
import { allFiltersForDisplay } from '../../helpers/allFiltersForDisplay'


export class Company extends canAnnotate(canBookmark(ConcreteMdel)) {

    name: string
    declare uid: number 
    declare description: string
    declare field: Field[]

    constructor (doc: ICompany, fieldDoc: IField[]) {
        super(doc.uid, ResourceType.Company)

        this.name = doc.name
        this.uid = doc.uid
        this.description = doc.description
        this.field = fieldDoc.map(f => new Field(f))
    }

    toString() : string {
        return this.name
    }
}