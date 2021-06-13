import { MatchResultWasModifiedProjection } from './match-result-was-modified.projection';
import { MatchResultWasRegisteredProjection } from './match-result-was-registered.projection';
import { MatchWasCreatedProjection } from './match-was-created.projection';
import { MatchWasDeletedProjection } from './match-was-deleted.projection';
import { MatchWasScheduledProjection } from './match-was-scheduled.projection';

export const ProjectionHandlers = [
  MatchWasCreatedProjection,
  MatchWasScheduledProjection,
  MatchWasDeletedProjection,
  MatchResultWasModifiedProjection,
  MatchResultWasRegisteredProjection,
];
