import { Document, Schema } from 'mongoose';

export const CompetitionSchema = new Schema({
  _id: String,
  name: String,
  type: String,
  sportName: String,
  moderatorIds: [String],
  hasStarted: Boolean,
});

export interface CompetitionView extends Document {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly sportName: string;
  readonly moderatorIds: string[];
  readonly hasStarted: boolean;
}

export const COMPETITION_MODEL = 'COMPETITION_MODEL';
