import { MatchWasCreatedProjection } from './match-was-created.projection';
import { MatchWasDeletedProjection } from './match-was-deleted.projection';
import { MatchWasScheduledProjection } from './match-was-scheduled.projection';

export const ProjectionHandlers = [
  MatchWasCreatedProjection,
  MatchWasScheduledProjection,
  MatchWasDeletedProjection,
];
