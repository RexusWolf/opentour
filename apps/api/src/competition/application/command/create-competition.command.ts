import { ICommand } from '@nestjs/cqrs';

export class CreateCompetitionCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly sportName: string;
  readonly moderatorId: string;

  constructor(params: {
    id: string;
    name: string;
    type: string;
    sportName: string;
    moderatorId: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.type = params.type;
    this.sportName = params.sportName;
    this.moderatorId = params.moderatorId;
  }
}
