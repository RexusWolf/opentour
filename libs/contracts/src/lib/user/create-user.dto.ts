import { Role } from '../auth';

export class CreateUserDTO {
  id: string;
  email: string;
  plainPassword: string;
  roles: Role[];
}
