import { Resource, Role } from '@opentour/contracts';
import { RolesBuilder } from 'nest-access-control';

export const acl: RolesBuilder = new RolesBuilder();

// prettier-ignore
acl
  .grant(Role.User)
    .createAny(Resource.Competition)
    .createAny(Resource.Team)
    .readAny(Resource.Competition)
    .readAny(Resource.Match)
    .readAny(Resource.Team)
  .grant(Role.CompetitionOwner)
    .updateOwn(Resource.Competition)
    .deleteOwn(Resource.Competition)
    .updateOwn(Resource.Match)
    .deleteOwn(Resource.Match)
  .grant(Role.TeamOwner)
    .updateOwn(Resource.Team)
    .deleteOwn(Resource.Team)
  .grant(Role.Admin)
    .inherit(Role.User)
    .inherit(Role.CompetitionOwner)
    .inherit(Role.TeamOwner)
;
