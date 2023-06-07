import { initialState } from '../../../src/store/appState'
import * as ArrayClause from '../../../src/helpers/arrayClauses'
import { Tech } from '../../../src/models/classes/Tech';

import { AppAction, ResourceType } from "../../../src/types";

describe('Array clauses for application actions', () => {

    // const mockStateManager = {
    //     appstate: initialState,
    //     dispatch: () => void 0,
    // }


    const actions: AppAction[] = [
        {
            resource_id: 1,
            resource_type: ResourceType.Tech,
        },
        {
            resource_id: 3,
            resource_type: ResourceType.Tech,
        },
        {
            resource_id: 2,
            resource_type: ResourceType.Job,
        },
    ]

    const resource: Tech = new Tech({
        uid: 1,
        name: 'Javascript',
    })

    
    it('Should find actioned (filtered, annotated, bookmarked) model items', () => {

        const found = actions.find(ArrayClause.findClause(resource, resource.resource_type))
        
        expect(found?.resource_id).toEqual(1)
    })

    it('Should filter out actioned (filtered, annotated, bookmarked) model items', () => {
        
        const filtered = actions.filter(ArrayClause.filterClause(resource, resource.resource_type))

        expect(filtered[0].resource_id).toEqual(3)
    }) 
})
