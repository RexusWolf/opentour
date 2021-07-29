import { Document, Schema } from 'mongoose';

export const CompetitionSchema = new Schema({
  _id: String,
  name: String,
  type: String,
  sportName: String,
  moderatorIds: [String],
  hasStarted: Boolean,
  currentJourney: String,
  scoreSystem: {
    victory: Number,
    tie: Number,
    defeat: Number,
  },
});

export interface CompetitionView extends Document {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly sportName: string;
  readonly moderatorIds: string[];
  readonly hasStarted: boolean;
  readonly currentJourney?: string;
  readonly scoreSystem: {
    victory: number;
    tie: number;
    defeat: number;
  };
}

export const COMPETITION_MODEL = 'COMPETITION_MODEL';
