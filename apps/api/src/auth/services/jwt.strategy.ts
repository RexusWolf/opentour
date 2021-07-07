import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadInterface, UserDTO } from '@opentour/contracts';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { GetUserByEmailQuery } from '../../user/application';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private queryBus: QueryBus) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserDTO> {
    const user = await this.queryBus.execute<GetUserByEmailQuery, UserDTO>(
      new GetUserByEmailQuery(payload.email)
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
