import { Document, Schema } from 'mongoose';

export const TeamSchema = new Schema({
  _id: String,
  competitionId: String,
  name: String,
  captainId: String,
  logo: String,
  deleted: Date,
});

export interface TeamView extends Document {
  readonly _id: string;
  readonly competitionId: string;
  readonly name: string;
  readonly captainId: string;
  readonly logo: string;
  readonly deleted: Date;
}

export const TEAM_MODEL = 'TEAM_MODEL';
