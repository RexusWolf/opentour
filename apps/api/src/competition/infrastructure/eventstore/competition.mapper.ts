import { Injectable } from '@nestjs/common';
import { CompetitionDTO } from '@opentour/contracts';

import { CompetitionView } from '../read-model/schema/competition.schema';

@Injectable()
export class CompetitionMapper {
  viewToDto(competitionView: CompetitionView): CompetitionDTO {
    const { _id: id, ...data } = competitionView.toObject();

    return {
      id,
      ...data,
    };
  }
}
