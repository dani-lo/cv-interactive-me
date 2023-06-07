import { Model } from '../model'
import { Constructor, CvContext, ResourceType } from '../../types'
import { AppStateAction } from '../../store/appState';

import * as ArrayClause from '../../helpers/arrayClauses'

export enum IAnnotateKeys {
  DO_ACTION = 'annotate',
  UNDO_ACTION = 'deannotate',
  STATUS =  'annotated'
}

export interface IAnnotate extends Model{
  [IAnnotateKeys.DO_ACTION]: (text: string, ctx: CvContext) => void;
  [IAnnotateKeys.UNDO_ACTION]: (ctx: CvContext) => void;
  [IAnnotateKeys.STATUS]: (ctx: CvContext) => boolean;
}

export function canAnnotate<T extends Constructor<Model>>(constructor: T = Model as any) {

  abstract class Derived extends constructor implements IAnnotate{

    [IAnnotateKeys.DO_ACTION] (text: string, ctx: CvContext) {

      if (!ctx) {
        throw new Error('Can not add annotation')
      } 
      
      const { dispatch } = ctx

      if (!text || text == '') {
        dispatch({
            type: AppStateAction.DELETE_ANNOTATION,
            payload: {
              resource_id: this.id,
              resource_type: this.resource_type,
            }
          })
      } else {
        dispatch({
          type: AppStateAction.ADD_ANNOTATION,
          payload: {
            resource_id: this.id,
            resource_type: this.resource_type,
            text
          }
        })
      }

      
    }

    [IAnnotateKeys.UNDO_ACTION] (ctx: CvContext) {

      if (!ctx) {
        throw new Error('Can not delete annotation')
      } 
      
      const { dispatch } = ctx

      dispatch({
        type: AppStateAction.DELETE_ANNOTATION,
        payload: {
          resource_id: this.id,
          resource_type: this.resource_type,
        }
      })
    }

    [IAnnotateKeys.STATUS] (ctx: CvContext)  {

      if (ctx === null) {
        throw new Error('Can not check annotation')
      }

      const { annotations } = ctx.appstate

      return !!(annotations.find(ArrayClause.findClause(this, this.resource_type)))
    }
  }

  return Derived
}