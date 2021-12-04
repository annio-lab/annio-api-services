import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { BaseService } from '@annio/core/services';
import { CreateOrderDTO, OrderDTO } from '@annio/core/business/order/order.dto';
import { AppConfig } from '@app/config';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_REQUEST_ACTION } from '@annio/core/business/order/order.common';

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

  public async getAll(): Promise<OrderDTO[]> {
    return await this.client.emit(ORDER_REQUEST_ACTION.GET_ALL, {}).toPromise();
  }

  public async getById(id: string): Promise<OrderDTO> {
    return await this.client
      .emit(ORDER_REQUEST_ACTION.GET_BY_ID, id)
      .toPromise();
  }

  public async create(body: CreateOrderDTO): Promise<OrderDTO> {
    return await this.client
      .emit(ORDER_REQUEST_ACTION.CREATE, body)
      .toPromise();
  }

  public async cancel(id: string): Promise<OrderDTO> {
    return await this.client
      .emit(ORDER_REQUEST_ACTION.CANCEL_BY_ID, id)
      .toPromise();
  }

  public async checkStatus(id: string): Promise<OrderDTO> {
    return await this.client
      .emit(ORDER_REQUEST_ACTION.CHECK_STATUS_BY_ID, id)
      .toPromise();
  }
}
