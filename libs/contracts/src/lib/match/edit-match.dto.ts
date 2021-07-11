export class EditMatchDTO {
  localTeamId?: string;
  visitorTeamId?: string;
  result?: { localTeamScore: number; visitorTeamScore: number };
  date?: Date;
}
