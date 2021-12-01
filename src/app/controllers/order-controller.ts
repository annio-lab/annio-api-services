import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Inject,
  Get,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '@annio/core/lib/controllers';
import { ResponseDto } from '@annio/core/lib/dto';
import { ORDER_ROUTES } from '@app/constants';
import {
  CreateOrderDTO,
  OrderDTO,
  ORDER_STATUS,
  ORDER_REQUEST_ACTION,
} from '@annio/core/lib/business/order.business';
import { ObservableUtils } from '@annio/core/lib/utils';
import { AppConfig } from '@app/config';

@ApiTags(ORDER_ROUTES.TAGS)
@Controller()
export class OrderController extends BaseController {
  constructor(
    @Inject(AppConfig.services.order.key)
    private readonly orderService: ClientProxy,
  ) {
    super(OrderController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Get(ORDER_ROUTES.GET_ALL)
  async getAll(): Promise<ResponseDto<OrderDTO[]>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Get List Orders Success',
      async () =>
        await ObservableUtils.getFirstResponse(
          this.orderService.send(ORDER_REQUEST_ACTION.GET_ALL, undefined),
        ),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(ORDER_ROUTES.DETAIL)
  async detail(@Param('id') id: string): Promise<ResponseDto<OrderDTO>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Get Order Info Success',
      async () =>
        await ObservableUtils.getFirstResponse(
          this.orderService.send(ORDER_REQUEST_ACTION.GET_BY_ID, id),
        ),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CREATE)
  async create(@Body() body: CreateOrderDTO): Promise<ResponseDto<OrderDTO>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Create Order Success',
      async () =>
        await ObservableUtils.getFirstResponse(
          this.orderService.send(ORDER_REQUEST_ACTION.CREATE, body),
        ),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CANCEL)
  async cancel(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Cancel Order Success',
      async () =>
        await ObservableUtils.getFirstResponse(
          this.orderService.send(ORDER_REQUEST_ACTION.CANCEL_BY_ID, id),
        ),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CHECK_STATUS)
  async checkOrderStatus(
    @Param('id') id: string,
  ): Promise<ResponseDto<ORDER_STATUS>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Check Order Status Success',
      async () =>
        await ObservableUtils.getFirstResponse(
          this.orderService.send(ORDER_REQUEST_ACTION.CHECK_STATUS_BY_ID, id),
        ),
    );
  }
}
