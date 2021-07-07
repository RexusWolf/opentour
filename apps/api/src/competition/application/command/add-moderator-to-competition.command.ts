import { ICommand } from '@nestjs/cqrs';

export class AddModeratorToCompetitionCommand implements ICommand {
  readonly id: string;
  readonly moderatorEmail: string;

  constructor(competitionId: string, moderatorEmail: string) {
    this.id = competitionId;
    this.moderatorEmail = moderatorEmail;
  }
}
