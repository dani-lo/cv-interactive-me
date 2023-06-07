import { z } from '../../deps.ts'

export const createFilterSchema = z.object({
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
    }),
})

const paramsByUser = {
    params: z.object({
        userId: z.string(),
    }),
}
const paramsByFilter = {
    params: z.object({
        filterid: z.string(),
    }),
}

export const getAllFiltersSchema = z.object({
    ...paramsByUser,
})

export const deleteFilterSchema = z.object({
    ...paramsByFilter,
})

export const deleteAllFiltersSchema = z.object({
    ...paramsByUser,
})

export type CreateFilterInput = z.TypeOf<typeof createFilterSchema>['body']
export type GetAllFiltersInput = z.TypeOf<typeof getAllFiltersSchema>['params']
export type DeleteFilterInput = z.TypeOf<typeof deleteFilterSchema>['params']
export type DeleteAllFiltersInput = z.TypeOf<typeof deleteAllFiltersSchema>['params']