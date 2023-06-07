import { Collection } from '../../deps.ts'
import { ObjectId } from '../../deps.ts'
import { None, Some, Option } from '../../deps.ts'

import { db } from '../utils/connectDB.ts'

export interface FilterSchema {
  _id?: ObjectId;
  resource_id: number;
  userId: ObjectId;
  resource_type: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Filter: Option<Collection<FilterSchema>> = db.isSome() ? 
  Some(db.unwrap().collection<FilterSchema>('filters')) : 
  None()
