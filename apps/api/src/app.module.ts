import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './app.middleware';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap.module';
import { CompetitionModule } from './competition/infrastructure';
import { MatchModule } from './match/infrastructure';
import { TeamModule } from './team/infrastructure';
import { UserModule } from './user/infrastructure';

export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [
        BootstrapModule,
        AuthModule,
        UserModule,
        CompetitionModule,
        MatchModule,
        TeamModule,
      ],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
