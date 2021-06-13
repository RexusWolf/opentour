import { ICommand } from '@nestjs/cqrs';
import { EditTeamDTO } from '@opentour/contracts';

export class UpdateTeamCommand implements ICommand {
  readonly teamId: string;
  readonly name: string;
  readonly membersIds: string[];
  constructor(id: string, editTeamDTO: EditTeamDTO) {
    this.teamId = id;
    this.name = editTeamDTO.name;
    this.membersIds = editTeamDTO.membersIds;
  }
}
