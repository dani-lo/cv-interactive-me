import { Model } from '../model'
import { Constructor, CvContext } from '../../types'
import { AppStateAction } from '../../store/appState';

import * as ArrayClause from '../../helpers/arrayClauses'

export enum IBookmarkKeys {
  DO_ACTION = 'bookmark',
  UNDO_ACTION = 'debookmark',
  STATUS =  'bookmarked'
}



export interface IBookmark {
  [IBookmarkKeys.DO_ACTION]: (ctx: CvContext) => void;
  [IBookmarkKeys.UNDO_ACTION]: (ctx: CvContext) => void;
  [IBookmarkKeys.STATUS]: (ctx: CvContext) => boolean;
}

export function canBookmark<T extends Constructor<Model>>(constructor: T = Model as any) {

  abstract class Derived extends constructor implements IBookmark {

    [IBookmarkKeys.DO_ACTION] (ctx: CvContext) {
      if (ctx === null) {
        throw new Error('Can not add bookmark')
      }

      const { dispatch } = ctx

      dispatch({
        type: AppStateAction.ADD_BOOKMARK,
        payload: {
          resource_id: this.id,
          resource_type: this.resource_type
        }
      })
    }

    [IBookmarkKeys.UNDO_ACTION] (ctx: CvContext) {
      if (ctx === null) {
        throw new Error('Can not remove bookmark')
      }

      const { dispatch } = ctx

      // console.log('UNDO BOOKMARK!!! ::: resource_id, resource_type', this.id, this.resource_type)
      
      dispatch({
        type: AppStateAction.REMOVE_BOOKMARK,
        payload: {
          resource_id: this.id,
          resource_type: this.resource_type
        }
      })
    }

    [IBookmarkKeys.STATUS] (ctx: CvContext)  {

      if (ctx === null) {
        throw new Error('Can not check bookmark')
      }

      const { bookmarks } = ctx.appstate
      // console.log(bookmarks)
      // console.log(this.resource_type)
      // console.log(!!(bookmarks.find(ArrayClause.findClause(this, this.resource_type))))
      return !!(bookmarks.find(ArrayClause.findClause(this, this.resource_type)))
    }
  }

  return Derived
}
