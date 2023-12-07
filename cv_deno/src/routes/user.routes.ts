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


/*
import { oak_Router } from '../../deps.ts'

import userController from '../controllers/user.controller.ts'
import { createUserSchema } from '../schema/user.schema.ts'
import validate from "../middleware/validate.ts"

const router = new oak_Router()

router.get<string>('/test', () => {
    console.log('HEREEEEEEEEEE')
    
})

// const router = new oak_Router();

router
  .get("/foo", (context) => {
    console.log('HEREEEEEEEEEELLLLL')
    context.response.body = "Hello world!";
  })
//   .get("/book", (context) => {
//     context.response.body = Array.from(books.values());
//   })
//   .get("/book/:id", (context) => {
//     if (books.has(context?.params?.id)) {
//       context.response.body = books.get(context.params.id);
//     }
//   });

// router.post<string>(
//     '/',
//     validate(createUserSchema),
//     userController.createUserController
// )

// router.delete<string>('/:userId', userController.deleteUserController)

export default router
*/