export class RankingDTO {
  id: string;
  competitionId: string;
  teams: {
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
