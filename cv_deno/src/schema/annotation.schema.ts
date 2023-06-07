import { z } from '../../deps.ts'

export const createAnnotationSchema = z.object({
    body: z.object({
        resource_id: z.number({
            required_error: 'Resource ID is required',
        }),
        userId: z.string({
            required_error: 'User ID ID is required',
        }),
        resource_type: z.string({
            required_error: 'Resource type is required',
        }),
        text: z.string({
            required_error: 'Resource type is required',
        }),
    }),
})

const paramsByUser = {
    params: z.object({
        userId: z.string(),
    }),
}
const paramsByAnnotation = {
    params: z.object({
        annotationId: z.string(),
    }),
}


export const updateAnnotationSchema = z.object({
    ...paramsByAnnotation,
    body: z.object({
        text: z.string(),
    }).partial(),
})



export const getAllAnnotationsSchema = z.object({
    ...paramsByUser,
})

export const deleteAnnotationSchema = z.object({
    ...paramsByAnnotation,
})

export const deleteAllAnnotationsSchema = z.object({
    ...paramsByUser,
})

export type CreateAnnotationInput = z.TypeOf<typeof createAnnotationSchema>['body']
export type UpdateAnnotationInput = z.TypeOf<typeof updateAnnotationSchema>
export type UpdateAnnotationInputBody = z.TypeOf<typeof updateAnnotationSchema>['body']
export type GetAllAnnotationsInput = z.TypeOf<typeof getAllAnnotationsSchema>['params']
export type DeleteAnnotationInput = z.TypeOf<typeof deleteAnnotationSchema>['params']
export type DeleteAllAnnotationsInput = z.TypeOf<typeof deleteAllAnnotationsSchema>['params']