import {
  Module,
  DynamicModule,
  Logger,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmConfigModule } from '@annio/core/lib/modules';
import { BodyParserMiddleware } from '@annio/core/lib/middlewares';
import { OrderController } from './controllers';
import { IAppConfig } from './interfaces';

@Module({})
export class AppModule implements NestModule {
  static forRoot(config: IAppConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [TypeOrmConfigModule.forRoot(config.database, new Logger('DB'))],
      controllers: [OrderController],
      providers: [
        {
          provide: config.services.order.key,
          useFactory: () =>
            ClientProxyFactory.create(config.services.order.config),
        },
        {
          provide: config.services.payment.key,
          useFactory: () =>
            ClientProxyFactory.create(config.services.payment.config),
        },
      ],
    };
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(BodyParserMiddleware).forRoutes('*');
  }
}
