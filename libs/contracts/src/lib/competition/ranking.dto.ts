export class RankingDTO {
  id: string;
  competitionId: string;
  teams: {
    name: string;
    matchPlayeds: number;
    victories: number;
    ties: number;
    defeats: number;
    points: number;
    lastFive: string[];
  }[];
}
