import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TeamId } from '../../../team/model';
import { MatchIdNotFoundError } from '../../domain/exception/match-id-not-found.error';
import { MatchId } from '../../domain/model';
import { MATCHES, Matches } from '../../domain/repository';
import { MatchMapper } from '../../infrastructure/repository/match.mapper';
import { UpdateMatchCommand } from './update-match.command';

@CommandHandler(UpdateMatchCommand)
export class UpdateMatchHandler implements ICommandHandler<UpdateMatchCommand> {
  constructor(
    @Inject(MATCHES) private matches: Matches,
    private matchMapper: MatchMapper
  ) {}

  async execute(command: UpdateMatchCommand) {
    const matchId = MatchId.fromString(command.matchId);

    const match = await this.matches.find(matchId);
    if (!match) {
      throw MatchIdNotFoundError.with(matchId);
    }

    match.isFinished()
      ? match.modifyResult(command.result)
      : match.registerResult(command.result);

    match.hasLocalTeam() &&
      match.addLocalTeam(TeamId.fromString(command.localTeamId));
    match.hasVisitorTeam() &&
      match.addVisitorTeam(TeamId.fromString(command.visitorTeamId));

    match.isScheduled()
      ? match.modifySchedule(command.date)
      : match.schedule(command.date);

    this.matches.save(match);

    return this.matchMapper.aggregateToEntity(match);
  }
}
