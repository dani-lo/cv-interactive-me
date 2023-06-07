import { oak_Router } from '../../deps.ts'

import annotationController from '../controllers/annotation.controller.ts'
import validate from "../middleware/validate.ts"

import { 
    createAnnotationSchema,
    updateAnnotationSchema 
} from '../schema/annotation.schema.ts'

const router = new oak_Router()

router.get<string>('/:userId', annotationController.findAllAnnotationsController)

router.post<string>(
    '/',
    validate(createAnnotationSchema),
    annotationController.createAnnotationController
)

router.patch<string>(
    '/:annotationId',
    validate(updateAnnotationSchema),
    annotationController.updateAnnotationController
)

router.delete<string>('/:annotationId', annotationController.deleteAnnotationController)
router.delete<string>('/user/:userId', annotationController.deleteAllAnnotationsController)

export default router