import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@annio/core/services';
import { CreateOrderDTO, OrderDTO } from '@annio/core/business/order/order.dto';
import { AppConfig } from '@app/config';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_REQUEST_ACTION } from '@annio/core/business/order/order.common';
import { IOrder } from '@annio/core/business/order/order.interface';
import { ObservableUtils } from '@annio/core/utils';

@Injectable()
export class OrderService extends BaseService {
  constructor(
    @Inject(AppConfig.services.order.key)
    private readonly client: ClientProxy,
  ) {
    super(OrderService.name);
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  public async getAll(): Promise<IOrder[]> {
    return await ObservableUtils.getFirstResponse(
      this.client.emit(ORDER_REQUEST_ACTION.GET_ALL, {}),
    );
  }

  public async getById(id: string): Promise<IOrder> {
    return await ObservableUtils.getFirstResponse(
      this.client.emit(ORDER_REQUEST_ACTION.GET_BY_ID, id),
    );
  }

  public async create(body: CreateOrderDTO): Promise<IOrder> {
    return await ObservableUtils.getFirstResponse(
      this.client.emit(ORDER_REQUEST_ACTION.CREATE, body),
    );
  }

  public async cancel(id: string): Promise<boolean> {
    return await ObservableUtils.getFirstResponse(
      this.client.emit(ORDER_REQUEST_ACTION.CANCEL_BY_ID, id),
    );
  }

  public async checkStatus(id: string): Promise<OrderDTO> {
    return await ObservableUtils.getFirstResponse(
      this.client.emit(ORDER_REQUEST_ACTION.CHECK_STATUS_BY_ID, id),
    );
  }
}
