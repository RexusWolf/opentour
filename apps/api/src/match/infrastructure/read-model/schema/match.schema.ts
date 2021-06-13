import { Document, Schema } from 'mongoose';

export const MatchSchema = new Schema({
  _id: String,
  competitionId: String,
  index: Number,
  journey: String,
  localTeam: {
    name: String,
    score: Number,
  },
  visitorTeam: {
    name: String,
    score: Number,
  },
  date: Date,
  finished: Date || null,
});

export interface MatchView extends Document {
  readonly _id: string;
  competitionId: string;
  readonly index: number;
  readonly journey: string;
  readonly localTeam: {
    readonly name: string;
    readonly score: number;
  };
  readonly visitorTeam: {
    readonly name: string;
    readonly score: number;
  };
  readonly date: Date;
  readonly finished: Date | null;
}

export const MATCH_MODEL = 'MATCH_MODEL';
