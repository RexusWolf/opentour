export class MatchDTO {
  id: string;
  competitionId: string;
  index: number;
  journey: string;
  localTeam: {
    name: string;
    logo: string;
    score: number;
  };
  visitorTeam: {
    name: string;
    logo: string;
    score: number;
  };
  date: Date;
  finished: Date | null;
}
