import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@opentour/contracts';
import { GetTeamQuery } from '../../application';
import { TeamView } from '../read-model/schema/team.schema';

@Injectable()
export class TeamGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(TeamGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.team = await this.queryBus.execute(new GetTeamQuery(id));
    }

    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const team: TeamView = context.switchToHttp().getRequest()?.team;

    if (team && team.captainId === user.id) {
      user?.roles.push(Role.TeamOwner);
    }

    return user;
  }
}
