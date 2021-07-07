import { ApiProperty } from '@nestjs/swagger';
import { CredentialsInterface } from '@opentour/contracts';

export class LoginDTO implements CredentialsInterface {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
