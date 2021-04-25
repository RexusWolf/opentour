export class MatchDTO {
  id: string;
  competitionId: string;
  index: number;
  journey: string;
  localTeamId: string;
  visitorTeamId: string;
  date: Date;
  result: { localTeamScore: number; visitorTeamScore: number };
}
