import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenInterface } from '@opentour/contracts';

import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('authorization')
@Controller('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<AccessTokenInterface> {
    this.logger.debug(`login: ${JSON.stringify(loginDTO)}`);
    const { email, password } = loginDTO;
    const isValid = await this.authService.validateUser(email, password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.authService.generateAccessToken(email);
  }
}
