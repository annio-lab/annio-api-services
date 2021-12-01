import { IApiConfig, IMicroServiceConfig } from '@annio/core/lib/interfaces';

export interface IAppConfig {
  project: {
    package: any;
  };
  env: {
    name: string;
    port: number;
    protocol: 'http' | 'https';
  };
  apiConfig: IApiConfig;
  services: {
    order: IMicroServiceConfig;
    payment: IMicroServiceConfig;
  };
}
