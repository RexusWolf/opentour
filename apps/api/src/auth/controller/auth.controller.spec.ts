import { UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from '@opentour/contracts';

import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

const ID = '78dbd5bd-86c1-4925-a08c-1d0170e4851d';
const EMAIL = 'randomEmail@uco.es';
const PASSWORD = 'password';

describe('AuthController', () => {
  let controller: AuthController;
  let user: UserDTO;
  const queryBus: Partial<QueryBus> = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [
        AuthService,
        {
          provide: QueryBus,
          useValue: queryBus,
        },
      ],
    }).compile();
    app.useLogger(false);

    user = {
      id: ID,
      email: EMAIL,
      roles: [],
    };
    controller = app.get<AuthController>(AuthController);
    queryBus.execute = jest.fn().mockResolvedValue(user);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login valid user', async () => {
    expect(
      await controller.login({ email: EMAIL, password: PASSWORD })
    ).toHaveProperty('access_token');
  });

  it('should not login invalid password', () => {
    expect(
      controller.login({ email: EMAIL, password: 'wrong password' })
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should not login invalid user', () => {
    queryBus.execute = jest.fn().mockResolvedValue(null);

    expect(
      controller.login({ email: EMAIL, password: PASSWORD })
    ).rejects.toThrow(UnauthorizedException);
  });
});
