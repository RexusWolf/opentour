import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@opentour/contracts';
import { GetCompetitionQuery } from '../../../competition/application';
import { CompetitionView } from '../../../competition/infrastructure/read-model/schema/competition.schema';
import { GetMatchQuery } from '../../application';
import { MatchView } from '../read-model/schema/match.schema';

@Injectable()
export class MatchGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(MatchGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      const match = await this.queryBus.execute<GetMatchQuery, MatchView>(
        new GetMatchQuery(id)
      );
      req.competition = await this.queryBus.execute(
        new GetCompetitionQuery(match.competitionId)
      );
    }

    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const competition: CompetitionView = context
      .switchToHttp()
      .getRequest()?.competition;

    if (competition && competition.moderatorIds.includes(user.id)) {
      user?.roles.push(Role.CompetitionOwner);
    }

    return user;
  }
}
