import * as path from 'path';
import { readFileSync } from 'fs';

import { IAppConfig } from '@app/interfaces';
import { Transport } from '@nestjs/microservices';
import { MICROSERVICE } from '@app/constants';

export const AppConfig: IAppConfig = {
  project: {
    package: loadRootJson('package.json'),
  },
  env: {
    name: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? +process.env.PORT : 5000,
    protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http',
  },
  apiConfig: {
    prefix: process.env.API_PREFIX,
  },
  services: {
    order: {
      key: MICROSERVICE.ORDER,
      config: {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.SERVICE_ORDER_RMQ_URL],
          queue: process.env.SERVICE_ORDER_RMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    },
    payment: {
      key: MICROSERVICE.PAYMENT,
      config: {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.SERVICE_PAYMENT_RMQ_URL],
          queue: process.env.SERVICE_PAYMENT_RMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    },
  },
};

export function getRootPath() {
  return __dirname + './../../../';
}

export function resolveRootFile(fileName: string) {
  return path.resolve(__dirname, getRootPath(), fileName);
}

export function loadRootJson<T = any>(fileName: string) {
  return JSON.parse(readFileSync(resolveRootFile(fileName)).toString()) as T;
}
