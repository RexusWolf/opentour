import { Document, Schema } from 'mongoose';

export const CompetitionSchema = new Schema({
  _id: String,
  name: String,
  type: String,
  sportId: String,
  moderatorIds: [String],
});

export interface CompetitionView extends Document {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly sportId: string;
  readonly moderatorIds: string[];
}

export const COMPETITION_MODEL = 'COMPETITION_MODEL';
