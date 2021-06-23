import { Document, Schema } from 'mongoose';

export const RankingSchema = new Schema({
  _id: String,
  competitionId: String,
  teams: Array,
});

export interface RankingView extends Document {
  readonly _id: string;
  readonly competitionId: string;
  readonly teams: {
    id: string;
    name: string;
    logo: string;
    matchesPlayed: {
      id: string;
      index: number;
      score: number;
      result: string;
    }[];
  }[];
}

export const RANKING_MODEL = 'RANKING_MODEL';
