export class CreateMatchDTO {
  id: string;
  competitionId: string;
  localTeamId?: string;
  visitorTeamId?: string;
  index: number;
  journey: string;
}
