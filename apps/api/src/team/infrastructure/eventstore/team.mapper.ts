import { Injectable } from '@nestjs/common';
import { TeamDTO } from '@opentour/contracts';

import { TeamView } from '../read-model/schema/team.schema';

@Injectable()
export class TeamMapper {
  viewToDto(teamView: TeamView): TeamDTO {
    const { _id: id, ...data } = teamView.toObject();

    return {
      id,
      ...data,
    };
  }
}
