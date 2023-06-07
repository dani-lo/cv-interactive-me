import { Collection } from '../../deps.ts'
import { ObjectId } from '../../deps.ts'
import { None, Some, Option } from '../../deps.ts'

import { db } from '../utils/connectDB.ts'

export interface UserSchema {
  _id?: ObjectId;
  tok: string;
  createdAt: Date;
  updatedAt: Date;
}

export const User: Option<Collection<UserSchema>> = db.isSome() ? 
  Some(db.unwrap().collection<UserSchema>('users')) : 
  None()