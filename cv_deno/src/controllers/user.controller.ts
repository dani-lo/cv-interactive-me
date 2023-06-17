import type { RouterContext } from '../../deps.ts'
import { Bson } from '../../deps.ts'


import { User } from '../models/user.model.ts'

import type { CreateUserInput } from '../schema/user.schema.ts'
import { urlSearchParamsToBody } from '../utils/formDataReader.ts'

const createUserController = async ({
    request,
    response,
  }: RouterContext<string>) => {

    if (User.isNone()) {
        return
    }

    try {

        const usersCollection = User.unwrap()

        const contentType  = request.headers.get('content-type')
        const isTxt = contentType?.indexOf('text')!= -1

        const reqBody  = await request.body({type: isTxt ? 'text' : 'form'}).value

        const objBody = isTxt ? JSON.parse(reqBody) : urlSearchParamsToBody<FormFieldsObject>(reqBody)

        const { tok } = objBody
        
        const userExists = await usersCollection.findOne({ 
            tok
        })

        if (userExists) {
            response.status = 409
            response.body = {
                status: 'fail',
                message: 'User with that tok already exists',
            }
            return
        }

        const createdAt = new Date()
        const updatedAt = createdAt

        const userId: Bson.ObjectId = await usersCollection.insertOne({
            tok,
            createdAt,
            updatedAt,
        })

        if (!userId) {
            response.status = 500
            response.body = { status: 'error', message: 'Error creating user' }
            return
        }

        const user = await usersCollection.findOne({_id: userId})

        response.status = 201
        response.body = {
            status: 'success',
            data: { user },
        }

    } catch (error) {

        response.status = 500
        response.body = { status: 'error', message: error.message }

        return
    }
}

const findUserController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (User.isNone()) {
        return
    }

    try {

        const usersCollection = User.unwrap()

        const user = await usersCollection.findOne({ tok: params.tok })

        if (!user) {
            response.status = 404
            response.body = {
                status: 'success',
                message: 'No todo with that Id exists',
            }
            return
        } else {
            response.status = 200
            response.body = {
                status: 'success',
                data: { user },
            }
        }
             
        

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteUserController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (User.isNone()) {
        return
    }

    try {

        const usersCollection = User.unwrap()  
        const numberOfUser = await usersCollection.deleteOne({
            _id: new Bson.ObjectId(params.userId),
        })

        if (!numberOfUser) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No user with that Id exists',
            }

            return
        }

        response.status = 204

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

export default {
    createUserController,
    findUserController,
    deleteUserController,
}
  