import { oak_Router } from '../../deps.ts'

import userController from '../controllers/user.controller.ts'
import { createUserSchema } from '../schema/user.schema.ts'
import validate from "../middleware/validate.ts"

const router = new oak_Router()

router.get<string>('/:tok', userController.findUserController)

router.post<string>(
    '/',
    validate(createUserSchema),
    userController.createUserController
)

router.delete<string>('/:userId', userController.deleteUserController)

export default router