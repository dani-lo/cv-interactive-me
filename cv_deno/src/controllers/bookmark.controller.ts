import type { RouterContext } from '../../deps.ts'
import { Bson } from '../../deps.ts'

import { Bookmark } from '../models/bookmark.model.ts'

import type {
  CreateBookmarkInput
} from '../schema/bookmark.schema.ts'
import { FormFieldsObject, urlSearchParamsToBody } from '../utils/formDataReader.ts'

const createBookmarkController = async ({
    request,
    response,
  }: RouterContext<string>) => {

    if (Bookmark.isNone()) {
        return
    }

    try {

        const bookmarksCollection = Bookmark.unwrap()

        const contentType  = request.headers.get('content-type')
        const isTxt = contentType?.indexOf('text')!= -1

        const reqBody  = await request.body({type: isTxt ? 'text' : 'form'}).value

        const objBody = isTxt ? JSON.parse(reqBody) : urlSearchParamsToBody<FormFieldsObject>(reqBody)

        const { resource_id, resource_type, userId } = objBody

        const objUserID = new Bson.ObjectId(userId) 

        const bookmarkExists = await bookmarksCollection.findOne({ 
            resource_id, 
            resource_type, 
            userId: objUserID 
        })

        if (bookmarkExists) {
            response.status = 409
            response.body = {
                status: 'fail',
                message: 'Bookmark with that title already exists',
            }
            return
        }

        const createdAt = new Date()
        const updatedAt = createdAt

        const bookmarkId: string | Bson.ObjectId = await bookmarksCollection.insertOne({
            resource_id, 
            resource_type, 
            userId: objUserID,
            createdAt,
            updatedAt,
        })

        if (!bookmarkId) {
            response.status = 500
            response.body = { status: 'error', message: 'Error creating user' }
            return
        }

        const bookmark = await bookmarksCollection.findOne({_id: bookmarkId})

        response.status = 201
        response.body = {
            status: 'success',
            data: { bookmark },
        }

    } catch (error) {
        
        response.status = 500
        response.body = { status: 'error', message: error.message }

        return
    }
}

const findAllBookmarksController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Bookmark.isNone()) {
        return
    }

    try {

        const bookmarksCollection = Bookmark.unwrap()

        const bookmarks = await bookmarksCollection
            .find({ userId: new Bson.ObjectId(params.userId) })
            .toArray()

        if (!bookmarks) {
            response.status = 404
            response.body = {
                status: 'success',
                message: 'No bookmark with that Id exists',
            }
            return
        }

        response.status = 200
        response.body = {
            status: 'success',
            data: { bookmarks },
        }

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteBookmarkController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Bookmark.isNone()) {
        return
    }

    try {

        const bookmarksCollection = Bookmark.unwrap()

        const numberOfBookmark = await bookmarksCollection.deleteOne({
            _id: new Bson.ObjectId(params.bookmarkId),
        })

        if (!numberOfBookmark) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No bookmark with that Id exists',
            }

            return
        }

        
        response.status = 200
        response.body = {  status: 'success', message: 'Bookmark deleted' }

    } catch (error) {
        response.status = 500
        response.body = { status: 'error', message: error.message }
        return
    }
}

const deleteAllBookmarksController = async ({
    params,
    response,
  }: RouterContext<string>) => {

    if (Bookmark.isNone()) {
        return
    }

    try {

        const bookmarksCollection = Bookmark.unwrap()

        const numberOfBookmark = await bookmarksCollection.deleteMany({
            userId: new Bson.ObjectId(params.userId),
        })

        if (!numberOfBookmark) {

            response.status = 404
            response.body = {
                status: 'success',
                message: 'No bookmarks with that user Id exists',
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
    createBookmarkController,
    findAllBookmarksController,
    deleteBookmarkController,
    deleteAllBookmarksController
}
  