import { ObjectId } from '../../deps.ts'
import { Collection } from '../../deps.ts'
import { None, Some, Option } from '../../deps.ts'

import { db } from '../utils/connectDB.ts'

export interface AnnotationSchema {
  _id?: ObjectId;
  resource_id: number;
  userId: ObjectId;
  resource_type: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Annotation: Option<Collection<AnnotationSchema>> = db.isSome() ? 
  Some(db.unwrap().collection<AnnotationSchema>('annotations')) : 
  None()
