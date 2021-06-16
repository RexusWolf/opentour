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
    readonly id: string;
    readonly name: string;
    readonly logo: string;
    readonly matchPlayeds: number;
    readonly victories: number;
    readonly ties: number;
    readonly defeats: number;
    readonly points: number;
    readonly lastFive: string[];
  }[];
}

export const RANKING_MODEL = 'RANKING_MODEL';
