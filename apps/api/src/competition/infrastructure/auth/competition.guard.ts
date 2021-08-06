import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@opentour/contracts';

import { GetCompetitionQuery } from '../../application';
import { CompetitionView } from '../read-model/schema/competition.schema';

@Injectable()
export class CompetitionGuard extends AuthGuard('jwt') {
  private readonly loggger = new Logger(CompetitionGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.competition = await this.queryBus.execute(
        new GetCompetitionQuery(id)
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
