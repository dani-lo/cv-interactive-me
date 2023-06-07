import { CvContext, Filter, ResourceType } from "../types"

export abstract class Model {
    
    declare id: number
    declare resource_type: ResourceType

    constructor (id: number, resource_type: ResourceType) {
        
        this.id = id 
        this.resource_type = resource_type
    }

    abstract toString() : string | null
    abstract toUrl(): string
    abstract display(filters: Filter[]) : boolean
    abstract getParentResource (): ResourceType | null
}

export class ConcreteMdel extends Model {

    toString () {
        return 'Cv Model'
    }

    toUrl () {
        return 'model'
    }
    
    display (filters: Filter[]) {
        return true
    }

    getParentResource () {
        return null
    }

}