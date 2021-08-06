import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadInterface, UserDTO } from '@opentour/contracts';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand, GetUserByEmailQuery } from '../../user/application';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
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
      const event = new CreateUserCommand({
        userId: uuid(),
        password: 'password',
        email: payload.email,
        roles: payload.roles,
      });
      await this.commandBus.execute(event);
    }

    return user;
  }
}
