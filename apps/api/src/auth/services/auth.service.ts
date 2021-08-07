import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenInterface,
  JwtPayloadInterface,
  UserDTO,
} from '@opentour/contracts';
import * as bcrypt from 'bcrypt';

import { GetUserByEmailQuery } from '../../user/application';

@Injectable()
export class AuthService {
  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hashSync(password, salt);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.queryBus.execute<GetUserByEmailQuery, UserDTO>(
      new GetUserByEmailQuery(email)
    );

    return user && (await bcrypt.compareSync(password, user.password));
  }

  async generateAccessToken(email: string): Promise<AccessTokenInterface> {
    const user = await this.queryBus.execute<GetUserByEmailQuery, UserDTO>(
      new GetUserByEmailQuery(email)
    );

    const payload: JwtPayloadInterface = {
      email: user.email,
      roles: user.roles,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS512',
      }),
    };
  }
}
