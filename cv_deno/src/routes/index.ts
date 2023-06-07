import { oak_Application } from '../../deps.ts'

import annotationRouter from './annotation.routes.ts'
import filterRouter from './filter.routes.ts'
import bookamrkRouter from './bookmark.routes.ts'
import userRouter from './user.routes.ts'

function init(app: oak_Application) {

  app.use(annotationRouter.prefix('/api/annotations').routes())
  app.use(bookamrkRouter.prefix('/api/bookmarks').routes())
  app.use(filterRouter.prefix('/api/filters').routes())
  app.use(userRouter.prefix('/api/users').routes())

  app.use(annotationRouter.allowedMethods())
  app.use(bookamrkRouter.allowedMethods())
  app.use(filterRouter.allowedMethods())
  app.use(userRouter.allowedMethods())
}

export default {
  init,
}