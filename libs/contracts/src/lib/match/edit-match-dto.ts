export class EditMatchDTO {
  localTeamId: string;
  visitorTeamId: string;
  date: Date;
  result: { localTeamScore: number; visitorTeamScore: number };
}
