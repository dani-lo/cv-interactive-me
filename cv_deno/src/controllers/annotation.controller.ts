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

        const annotationsCollection = Annotation.unwrap()

        const contentType  = request.headers.get('content-type')
        const isTxt = contentType?.indexOf('text')!= -1

        const reqBody  = await request.body({type: isTxt ? 'text' : 'form'}).value

        console.log('isTxt', isTxt)
        console.log('reqBody')
        console.log(reqBody)
        

        const objBody = isTxt ? JSON.parse(reqBody) : urlSearchParamsToBody<FormFieldsObject>(reqBody)

        const { resource_id, resource_type, userId, text } = objBody

        const objUserID = new Bson.ObjectId(userId) 

        console.log("user ID::", userId)
        
        console.log("resource_id::", resource_id)

        console.log("resource_type::", resource_type)

        console.log('text::', text)
        

        const annotationExists = await annotationsCollection?.findOne({ 
            resource_id, 
            resource_type, 
            userId: objUserID 
        })

        console.log('annotationExists?!', annotationExists)


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

        console.log('ADD IT!')
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

    console.log('#################### BEGIN updateAnnotationController #############################')

    try {

        const anotationId = params.annotationId
        const annotationsCollection = Annotation.unwrap()

        const contentType  = request.headers.get('content-type')
        const isTxt = contentType?.indexOf('text')!= -1

        const reqBody  = await request.body({type: isTxt ? 'text' : 'form'}).value

        console.log('++++++++++++++++++++++++++ isTxt', isTxt)
        console.log('reqBody')
        console.log(reqBody)

        const objBody = isTxt ? JSON.parse(reqBody) : urlSearchParamsToBody<FormFieldsObject>(reqBody)

        const { resource_id, resource_type, userId, text } = objBody

        const updatedInfo = await annotationsCollection.updateOne(
            { _id: new Bson.ObjectId(anotationId) },
            { $set: { text, updatedAt: new Date() } },
            { ignoreUndefined: true }
        )
        
        console.log('+++++++++++++++++++++++ IN updateAnnotationController :: updatedInfo')
        console.log(updatedInfo)

        if (!updatedInfo.matchedCount) {
            response.status = 404
            response.body = {
                status: 'fail',
                message: 'No annotation with that Id exists',
            }
            return
        }
        console.log('from PARAMS', params.annotationId)
        console.log('from UPSERT', updatedInfo.upsertedId)
        console.log('WE HAVE an udated anno? --- upserted')

        const updatedAnnotation = await annotationsCollection.findOne({ _id: new Bson.ObjectId(anotationId) })
        console.log(updatedAnnotation)

        response.status = 200
        response.body = {
            status: 'success',
            data: { annotation: updatedAnnotation },
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
  