import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  email: String,
  roles: [String],
});

export interface UserDocument {
  readonly _id: string;
  readonly email: string;
  readonly roles: string[];
}

export const USER_MODEL = 'USER_MODEL';
