import { CompetitionNextRoundWasStartedProjection } from './competition-next-round-was-started.projection';
import { CompetitionWasCreatedProjection } from './competition-was-created.projection';
import { CompetitionWasDeletedProjection } from './competition-was-deleted.projection';
import { CompetitionWasStartedProjection } from './competition-was-started.projection';
import { ModeratorWasAddedToCompetitionProjection } from './moderator-was-added-to-competition.projection';
import { RankingWasCreatedProjection } from './ranking-was-created.projection';
import { RankingWasUpdatedProjection } from './ranking-was-updated.projection';

export const ProjectionHandlers = [
  CompetitionWasCreatedProjection,
  CompetitionWasDeletedProjection,
  CompetitionWasStartedProjection,
  CompetitionNextRoundWasStartedProjection,
  RankingWasCreatedProjection,
  RankingWasUpdatedProjection,
  ModeratorWasAddedToCompetitionProjection,
];
