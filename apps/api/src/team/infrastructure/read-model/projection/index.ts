import { TeamWasCreatedProjection } from './team-was-created.projection';
import { TeamWasDeletedProjection } from './team-was-deleted.projection';

export const ProjectionHandlers = [
  TeamWasCreatedProjection,
  TeamWasDeletedProjection,
];
