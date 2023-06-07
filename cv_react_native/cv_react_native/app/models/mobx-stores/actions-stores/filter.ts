import { AppActionModel } from 'app/models/action';
import { CvAction } from './actionStore'
import { ApiActionResult } from 'app/types';

export class Filter extends CvAction implements AppActionModel {
  
  doAction () {
    this.store.addFilter(this)
  }

  undoAction () {
    this.store.removeFilter(this)
  }

  async update() : Promise<ApiActionResult<Filter>> {
    // 
    const res: ApiActionResult<Filter> = {
        status: '',
        data: []
    }
    return Promise.resolve(res)
}
}