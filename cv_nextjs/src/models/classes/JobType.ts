import { ConcreteMdel, Model } from '../model'

import { AppAction, IJobType, ResourceType } from '../../types'
import { canFilter } from '../mixins/withFilter'

export type JobtypePrefix = "PLACE" |  "TIME"

export class JobType extends canFilter(ConcreteMdel) implements IJobType {

    declare name: string
    declare uid: number
    declare prefix: JobtypePrefix  

    constructor (doc: IJobType) {
        super(doc.uid, ResourceType.JobType)

        this.name = doc.name
        this.uid = doc.uid
        this.prefix = doc.prefix
    }

    toString() : string {
        return this.name
    }

    toLabel () {
        if (this.prefix == "PLACE") {
            return 'Working from'
        }
        return 'Job type'
    }
    
}