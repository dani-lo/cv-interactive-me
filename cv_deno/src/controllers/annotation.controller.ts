import type { RouterContext } from '../../deps.ts'

import { Bson } from '../../deps.ts'

import { Annotation, AnnotationSchema } from '../models/annotation.model.ts'

import type {
    CreateAnnotationInput,
    UpdateAnnotationInputBody
} from '../schema/annotation.schema.ts'

import { urlSearchParamsToBody } from '../utils/formDataReader.ts'

const createAnnotationController = async ({
    request,
    response,
  }: RouterContext<string>) => {

    if (Annotation.isNone()) {
        return
    }

    try {

        const reqBody  = await request.body({ type: 'form' }).value

        const annotationsCollection = Annotation.unwrap()

        const { resource_id, resource_type, text, userId } = urlSearchParamsToBody<CreateAnnotationInput>(reqBody)

        const objUserID = new Bson.ObjectId(userId) 

        const annotationExists = await annotationsCollection?.findOne({ 
            resource_id, 
            resource_type, 
            userId: objUserID 
        })

        if (annotationExists) {
            response.status = 409
            response.body = {
                status: 'fail',
                message: 'Annotation with that title already exists',
            }
        return
        }

        const createdAt = new Date()
        const updatedAt = createdAt

        try {
            const annotationId: Bson.ObjectId = await annotationsCollection.insertOne({
                resource_id, 
                resource_type, 
                userId: objUserID,
                text,
                createdAt,
                updatedAt,
            })

            const annotation = await annotationsCollection.findOne({_id: annotationId})

            response.status = 201
            response.body = {
                status: 'success',
                data: { annotation },
            }

        } catch (error) {
            response.status = 500
            response.body = { status: 'error', message: 'Error creating user' }
            return
        }

    } catch (error) {
        
        response.status = 500
        response.body = { status: 'error', message: error.message }

        return
    }
}

const findAllAnnotationsController = async ({
    params,
    response,
  }: RouterContext<string>) => {
    
    if (Annotation.isNone()) {
        return
    }

    try {

        const annotationsCollection = Annotation.unwrap()

        const annotations = await annotationsCollection
            .find({ userId: new Bson.ObjectId(params.userId) })
            .toArray()

        response.status = 200
        response.body = {
            status: 'success',
            data: { annotations },
        }

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const updateAnnotationController = async ({
    params,
    request,
    response,
  }: RouterContext<string>) => {

    if (Annotation.isNone()) {
        return
    }

    try {

        const annotationsCollection = Annotation.unwrap()

        const anotationId = params.annotationId

        const reqBody  = await request.body({ type: 'form' }).value
        const { text } = urlSearchParamsToBody<UpdateAnnotationInputBody>(reqBody)

        const updatedInfo = await annotationsCollection.updateOne(
            { _id: new Bson.ObjectId(anotationId) },
            { $set: { text, updatedAt: new Date() } },
            { ignoreUndefined: true }
        )

        if (!updatedInfo.matchedCount) {
            response.status = 404
            response.body = {
                status: 'fail',
                message: 'No annotation with that Id exists',
            }
            return
        }

        const updatedTodo = await annotationsCollection.findOne({ _id: updatedInfo.upsertedId })

        response.status = 200
        response.body = {
            status: 'success',
            data: { todo: updatedTodo },
        }
    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteAnnotationController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Annotation.isNone()) {
        return
    }

    try {

        const annotationsCollection = Annotation.unwrap()

        const numberOfAnnotation = await annotationsCollection.deleteOne({
            _id: new Bson.ObjectId(params.annotationId),
        })

        if (!numberOfAnnotation) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No annotation with that Id exists',
            }

            return
        }

        
        response.status = 200
        response.body = {  status: 'success', message: 'Annotation deleted' }

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteAllAnnotationsController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Annotation.isNone()) {
        return
    }

    try {

        const annotationsCollection = Annotation.unwrap()

        const numberOfAnnotation = await annotationsCollection.deleteMany({
            userId: new Bson.ObjectId(params.userId),
        })

        if (!numberOfAnnotation) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No annotations with that user Id exists',
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
    createAnnotationController,
    findAllAnnotationsController,
    updateAnnotationController,
    deleteAnnotationController,
    deleteAllAnnotationsController
}
  