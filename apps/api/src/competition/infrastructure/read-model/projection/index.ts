import { CompetitionWasCreatedProjection } from './competition-was-created.projection';
import { CompetitionWasDeletedProjection } from './competition-was-deleted.projection';
import { CompetitionWasUpdatedProjection } from './competition-was-updated.projection';

export const ProjectionHandlers = [
  CompetitionWasCreatedProjection,
  CompetitionWasUpdatedProjection,
  CompetitionWasDeletedProjection,
];
