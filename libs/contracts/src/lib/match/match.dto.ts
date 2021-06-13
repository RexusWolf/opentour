export class MatchDTO {
  id: string;
  competitionId: string;
  index: number;
  journey: string;
  localTeam: {
    name: string;
    score: number;
  };
  visitorTeam: {
    name: string;
    score: number;
  };
  date: Date;
  finished: Date | null;
}
