import { oak_Router } from '../../deps.ts'

import filterController from '../controllers/filter.controller.ts'
import validate from "../middleware/validate.ts"

import { createFilterSchema } from '../schema/filter.schema.ts'

const router = new oak_Router()

router.get<string>('/:userId', filterController.findAllFiltersController)

router.post<string>(
    '/',
    validate(createFilterSchema),
    filterController.createFilterController
)

router.delete<string>('/:filterId', filterController.deleteFilterController)
router.delete<string>('/user/:userId', filterController.deleteAllFiltersController)

export default router