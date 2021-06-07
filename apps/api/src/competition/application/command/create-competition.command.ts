import { ICommand } from '@nestjs/cqrs';

export class CreateCompetitionCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly sportId: string;
  readonly moderatorId: string;

  constructor(params: {
    id: string;
    name: string;
    type: string;
    sportId: string;
    moderatorId: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.type = params.type;
    this.sportId = params.sportId;
    this.moderatorId = params.moderatorId;
  }
}
