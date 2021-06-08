import { Injectable } from '@nestjs/common';
import { MatchDTO } from '@opentour/contracts';

import { MatchView } from '../read-model/schema/match.schema';

@Injectable()
export class MatchMapper {
  viewToDto(matchView: MatchView): MatchDTO {
    const { _id: id, ...data } = matchView.toObject();

    return {
      id,
      ...data,
    };
  }
}
