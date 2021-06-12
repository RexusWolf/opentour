import { Document, Schema } from 'mongoose';

export const MatchSchema = new Schema({
  _id: String,
  competitionId: String,
  index: Number,
  journey: String,
  localTeamId: String,
  visitorTeamId: String,
  date: Date,
  result: {
    localTeamScore: Number,
    visitorTeamScore: Number,
  },
  deleted: Date || null,
});

export interface MatchView extends Document {
  readonly _id: string;
  readonly competitionId: string;
  readonly index: number;
  readonly journey: string;
  readonly localTeamId: string;
  readonly visitorTeamId: string;
  readonly date: Date | null;
  result: {
    readonly localTeamScore: number;
    readonly visitorTeamScore: number;
  };
  readonly deleted?: Date;
}

export const MATCH_MODEL = 'MATCH_MODEL';
