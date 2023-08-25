import { ConcreteMdel } from '../model'

import { AppAction, CvContext, IField, ResourceType } from '../../types'
import { canFilter } from '../mixins/withFilter'

export class Field extends canFilter(ConcreteMdel) implements IField{

    declare name: string
    declare uid: number

    constructor (doc: IField) {
        super(doc.uid, ResourceType.Field)

        this.name = doc.name
        this.uid = doc.uid
    }

    toString() : string {
        return this.name
    }
}