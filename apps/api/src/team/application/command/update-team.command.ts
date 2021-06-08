import { ICommand } from '@nestjs/cqrs';

export class UpdateTeamCommand implements ICommand {
  readonly teamId: string;
  readonly name: string;
  readonly membersIds: string[];
  constructor(params: { teamId: string; name: string; membersIds: string[] }) {
    this.teamId = params.teamId;
    this.name = params.name;
    this.membersIds = params.membersIds;
  }
}
