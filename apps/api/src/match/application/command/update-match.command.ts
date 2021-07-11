import { ICommand } from '@nestjs/cqrs';
import { EditMatchDTO } from '@opentour/contracts';

export class UpdateMatchCommand implements ICommand {
  readonly id: string;
  readonly date?: Date;
  readonly localTeamId?: string;
  readonly visitorTeamId?: string;
  readonly result?: { localTeamScore: number; visitorTeamScore: number };

  constructor(id: string, editMatchDTO: EditMatchDTO) {
    this.id = id;
    this.date = editMatchDTO.date;
    this.localTeamId = editMatchDTO.localTeamId;
    this.visitorTeamId = editMatchDTO.visitorTeamId;
    this.result = editMatchDTO.result;
  }
}
