import { Document, Schema } from 'mongoose';

export const TeamSchema = new Schema({
  _id: String,
  competitionId: String,
  name: String,
  captainId: String,
  membersIds: [String],
  deleted: Date,
});

export interface TeamView extends Document {
  readonly _id: string;
  readonly competitionId: string;
  readonly name: string;
  readonly captainId: string;
  readonly membersIds: string[];
  readonly deleted: Date;
}

export const TEAM_MODEL = 'TEAM_MODEL';
