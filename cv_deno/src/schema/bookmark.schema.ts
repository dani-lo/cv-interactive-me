import { z } from '../../deps.ts'

export const createBookmarkSchema = z.object({
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
const paramsByBookmark = {
    params: z.object({
        bookmarkid: z.string(),
    }),
}

export const getAllBookmarksSchema = z.object({
    ...paramsByUser,
})

export const deleteBookmarkSchema = z.object({
    ...paramsByBookmark,
})

export const deleteAllBookmarksSchema = z.object({
    ...paramsByUser,
})

export type CreateBookmarkInput = z.TypeOf<typeof createBookmarkSchema>['body']
export type GetAllBookmarksInput = z.TypeOf<typeof getAllBookmarksSchema>['params']
export type DeleteBookmarkInput = z.TypeOf<typeof deleteBookmarkSchema>['params']
export type DeleteAllBookmarksInput = z.TypeOf<typeof deleteAllBookmarksSchema>['params']