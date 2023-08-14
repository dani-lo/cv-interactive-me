import { ConcreteMdel, Model } from '../model'
import { AppAction, Constructor, WithUid } from '../../types'

export interface ILink {
  getSearchString: () => string;
}

export function canLink<T extends Constructor<ConcreteMdel>>(constructor: T = Model as any) {

  return class extends constructor implements ILink {

    getSearchString () {
      
      return `/${ this.resource_type }s/${ this.id }`.toLowerCase()
    }
  }
}