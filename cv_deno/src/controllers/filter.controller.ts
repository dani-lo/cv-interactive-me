import type { RouterContext } from '../../deps.ts'
import { Bson } from '../../deps.ts'

import { Filter } from '../models/filter.model.ts'

import type { CreateFilterInput } from '../schema/filter.schema.ts'
import { FormFieldsObject, urlSearchParamsToBody } from '../utils/formDataReader.ts'

const createFilterController = async ({
    request,
    response,
  }: RouterContext<string>) => {

    if (Filter.isNone()) {
        return
    }

    try {

        const filtersCollection = Filter.unwrap()

        const contentType  = request.headers.get('content-type')
        const isTxt = contentType?.indexOf('text')!= -1

        const reqBody  = await request.body({type: isTxt ? 'text' : 'form'}).value

        const objBody = isTxt ? JSON.parse(reqBody) : urlSearchParamsToBody<FormFieldsObject>(reqBody)

        const { resource_id, resource_type, userId } = objBody
                
        const objUserID = new Bson.ObjectId(userId) 
// 
        const filterExists = await filtersCollection.findOne({ 
            resource_id, 
            resource_type, 
            userId: objUserID 
        })

        if (filterExists) {
            response.status = 409
            response.body = {
                status: 'fail',
                message: 'Filter with that title already exists',
            }
            return
        }

        const createdAt = new Date()
        const updatedAt = createdAt

        const filterId: Bson.ObjectId = await filtersCollection.insertOne({
            resource_id, 
            resource_type, 
            userId: objUserID,
            createdAt,
            updatedAt,
        })

        if (!filterId) {
            response.status = 500
            response.body = { status: 'error', message: 'Error creating user' }
            return
        }

        const filter = await filtersCollection.findOne({_id: filterId})

        response.status = 201
        response.body = {
            status: 'success',
            data: { filter },
        }

    } catch (error) {

        response.status = 500
        response.body = { status: 'error', message: error.message }

        return
    }
}

const findAllFiltersController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Filter.isNone()) {
        return
    }

    try {

        const filtersCollection = Filter.unwrap()
        const filters = await filtersCollection
            .find({ userId: new Bson.ObjectId(params.userId) })
            .toArray()

        if (!filters) {
            response.status = 404
            response.body = {
                status: 'success',
                message: 'No filter with that Id exists',
            }
            return
        }

        response.status = 200
        response.body = {
            status: 'success',
            data: { filters },
        }

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteFilterController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Filter.isNone()) {
        return
    }

    try {

        const filtersCollection = Filter.unwrap()
        
        const numberOfFilter = await filtersCollection.deleteOne({
            _id: new Bson.ObjectId(params.filterId),
        })

        if (!numberOfFilter) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No filter with that Id exists',
            }

            return
        }
        
        response.status = 200
        response.body = {  status: 'success', message: 'Filter deleted' }

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteAllFiltersController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Filter.isNone()) {
        return
    }

    try {

        const filtersCollection = Filter.unwrap()

        const numberOfFilter = await filtersCollection.deleteMany({
            userId: new Bson.ObjectId(params.userId),
        })

        if (!numberOfFilter) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No filters with that user Id exists',
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
    createFilterController,
    findAllFiltersController,
    deleteFilterController,
    deleteAllFiltersController
}
  