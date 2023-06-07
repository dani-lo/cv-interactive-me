import { Model } from '../model'
import { Constructor, CvContext } from '../../types'
import { AppStateAction} from '../../store/appState'

export enum IFilterKeys  {
  DO_ACTION = 'filter',
  UNDO_ACTION = 'defilter',
  STATUS =  'fitered'
}

export interface IFilter {
  [IFilterKeys.DO_ACTION]: (ctx:CvContext) => void;
  [IFilterKeys.UNDO_ACTION]: (ctx:CvContext) => void;
  [IFilterKeys.STATUS]: (ctx:CvContext) => boolean;
}

export function canFilter<T extends Constructor<Model>>(constructor: T = Model as any) {

  abstract class Derived extends constructor implements IFilter {

    [IFilterKeys.DO_ACTION] (ctx:CvContext) {

      if (ctx === null) {
        throw new Error('Can not add filter')
      }

      const { dispatch } = ctx

      dispatch({
        type: AppStateAction.ADD_FILTER,
        payload: {
          resource_id: this.id,
          resource_type: this.resource_type
        }
      })
    }

    [IFilterKeys.UNDO_ACTION] (ctx:CvContext) {

      if (ctx === null) {
        throw new Error('Can not delete filter')
      }

      const { dispatch } = ctx

      dispatch({
        type: AppStateAction.DELETE_FILTER,
        payload: {
          resource_id: this.id,
          resource_type: this.resource_type
        }
      })
    }

    [IFilterKeys.STATUS] (ctx:CvContext) {
      return false
    }
  }

  
  
  return Derived
}