import { Role } from '../auth';

export class EditUserDTO {
  email: string;
  plainPassword: string;
  roles: Role[];
}
