import { Resource, Role } from '@opentour/contracts';
import { RolesBuilder } from 'nest-access-control';

export const acl: RolesBuilder = new RolesBuilder();

// prettier-ignore
acl
  .grant(Role.User)
    .createOwn(Resource.Competition)
    .readAny(Resource.Competition)
  .grant(Role.CompetitionOwner)
    .updateOwn(Resource.Competition)
    .deleteOwn(Resource.Competition)
  .grant(Role.Admin)
    .inherit(Role.CompetitionOwner)
;
