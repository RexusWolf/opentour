import { ICommand } from '@nestjs/cqrs';
import { EditMatchDTO } from '@opentour/contracts';

export class UpdateMatchCommand implements ICommand {
  readonly id: string;
  readonly date: Date;
  readonly result: { localTeamScore: number; visitorTeamScore: number };

  constructor(id: string, editMatchDTO: EditMatchDTO) {
    this.id = id;
    this.date = editMatchDTO.date;
    this.result = editMatchDTO.result;
  }
}
