import { Collection } from '../../deps.ts'
import { ObjectId } from '../../deps.ts'
import { None, Some, Option } from '../../deps.ts'

import { db } from '../utils/connectDB.ts'

export interface BookmarkSchema {
  _id?: ObjectId;
  resource_id: number;
  userId: ObjectId;
  resource_type: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Bookmark: Option<Collection<BookmarkSchema>> = db.isSome() ? 
  Some(db.unwrap().collection<BookmarkSchema>('bookmarks')) : 
  None()
