import { Document, Schema } from 'mongoose';

export const RankingSchema = new Schema({
  _id: String,
  competitionId: String,
  teams: [
    {
      name: String,
      matchPlayeds: Number,
      victories: Number,
      ties: Number,
      defeats: Number,
      points: Number,
      lastFive: [String],
    },
  ],
});

export interface RankingView extends Document {
  readonly _id: string;
  readonly competitionId: string;
  readonly teams: {
    readonly name: string;
    readonly matchPlayeds: number;
    readonly victories: number;
    readonly ties: number;
    readonly defeats: number;
    readonly points: number;
    readonly lastFive: string[];
  }[];
}

export const RANKING_MODEL = 'RANKING_MODEL';
