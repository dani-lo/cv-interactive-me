import { z } from '../../deps.ts'

export const createUserSchema = z.object({
    body: z.object({
        tok: z.string({
            required_error: 'Resource ID is required',
        }),
    }),
})

const params = {
    params: z.object({
        tok: z.string(),
    }),
}

export const getUserSchema = z.object({
    ...params,
})

export const deleteUserSchema = z.object({
    ...params,
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>['body']
export type GetUserInput = z.TypeOf<typeof getUserSchema>['params']
export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>['params']