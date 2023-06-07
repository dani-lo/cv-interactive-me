import { oak_Router } from '../../deps.ts'

import bookmarkController from '../controllers/bookmark.controller.ts'
import validate from "../middleware/validate.ts"

import { createBookmarkSchema } from '../schema/bookmark.schema.ts'

const router = new oak_Router()

router.get<string>('/:userId', bookmarkController.findAllBookmarksController)

router.post<string>(
    '/',
    validate(createBookmarkSchema),
    bookmarkController.createBookmarkController
)

router.delete<string>('/:bookmarkId', bookmarkController.deleteBookmarkController)
router.delete<string>('/user/:userId', bookmarkController.deleteAllBookmarksController)

export default router