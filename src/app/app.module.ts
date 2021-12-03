import {
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { BodyParserMiddleware } from '@annio/core/middlewares';
import { OrderController } from './controllers';
import { IAppConfig } from './interfaces';

@Module({})
export class AppModule implements NestModule {
  static forRoot(config: IAppConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [],
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
