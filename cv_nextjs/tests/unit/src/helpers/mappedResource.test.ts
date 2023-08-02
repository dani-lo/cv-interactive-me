import { mappedResource } from '../../../../src/helpers/mappedResource'
import { Tech } from '../../../../src/models/classes/Tech';

import { ITech } from "../../../../src/types";

describe('Array clauses for application actions', () => {

    // const mockState = {
    //     appstate: initialState,
    //     dispatch: () => void 0,
    // }

    const techData: ITech = {
        uid: 1,
        name: 'Javascript',
    }

    it('Should map a model doc to a hashmap of model instances keyed by uid', () => {

        const techModels = mappedResource<ITech, Tech>([techData], (doc) => new Tech(doc))
        
        expect(techModels.get(techData.uid)?.name).toEqual(techData.name)
    })
})


