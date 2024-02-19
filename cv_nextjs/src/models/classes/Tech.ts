import { ConcreteMdel, Model } from '../model'

import { canFilter } from '../mixins/withFilter'

import { AppAction, ITech, ResourceType } from '../../types'

export class Tech extends canFilter(ConcreteMdel) implements ITech {

    declare name: string
    declare uid: number 
    declare primary: boolean

    constructor (doc: ITech) {
        super(doc.uid, ResourceType.Tech)

        this.name = doc.name
        this.uid = doc.uid

        this.primary = doc.primary || false
    }

    toString() : string {
        return this.name
    }
}

