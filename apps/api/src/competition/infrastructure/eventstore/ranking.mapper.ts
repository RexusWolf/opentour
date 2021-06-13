import { Injectable } from '@nestjs/common';
import { RankingDTO } from '@opentour/contracts';

import { RankingView } from '../read-model/schema/ranking.schema';

@Injectable()
export class RankingMapper {
  viewToDto(rankingView: RankingView): RankingDTO {
    const { _id: id, ...data } = rankingView.toObject();

    return {
      id,
      ...data,
    };
  }
}
