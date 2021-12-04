import {
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { BodyParserMiddleware } from '@annio/core/middlewares';
import { OrderController } from './controllers';
import { IAppConfig } from './interfaces';
import { OrderService } from './services/order.service';

@Module({})
export class AppModule implements NestModule {
  static forRoot(config: IAppConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ClientsModule.register([
          {
            name: config.services.order.key,
            ...config.services.order.config,
          },
        ]),
      ],
      controllers: [OrderController],
      providers: [OrderService],
    };
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(BodyParserMiddleware).forRoutes('*');
  }
}
