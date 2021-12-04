import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@annio/core/controllers';
import { ResponseDto } from '@annio/core/dto';
import { ORDER_ROUTES } from '@app/constants';
import { ORDER_STATUS } from '@annio/core/business/order/order.common';
import { OrderDTO, CreateOrderDTO } from '@annio/core/business/order/order.dto';
import { OrderService } from '@app/services';

@ApiTags(ORDER_ROUTES.TAGS)
@Controller()
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super(OrderController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Get(ORDER_ROUTES.GET_ALL)
  @ApiOkResponse({
    type: OrderDTO,
    isArray: true,
    description: 'Get List Orders',
  })
  async getAll(): Promise<ResponseDto<OrderDTO[]>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Get List Orders Success',
      async () => {
        const response = await this.orderService.getAll();
        return response;
      },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(ORDER_ROUTES.DETAIL)
  @ApiOkResponse({
    type: OrderDTO,
    description: 'Get Order Info Detail',
  })
  async detail(@Param('id') id: string): Promise<ResponseDto<OrderDTO>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Get Order Info Success',
      async () => await this.orderService.getById(id),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(ORDER_ROUTES.CREATE)
  @ApiCreatedResponse({
    type: OrderDTO,
    description: 'Create New Order',
  })
  async create(@Body() body: CreateOrderDTO): Promise<ResponseDto<OrderDTO>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Create Order Success',
      async () => await this.orderService.create(body),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CANCEL)
  @ApiOkResponse({
    type: 'boolean',
    description: 'Cancel An Order',
  })
  async cancel(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Cancel Order Success',
      async () => await this.orderService.cancel(id),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CHECK_STATUS)
  @ApiOkResponse({
    type: 'ORDER_STATUS',
    description: 'Check Order Status',
  })
  async checkOrderStatus(
    @Param('id') id: string,
  ): Promise<ResponseDto<ORDER_STATUS>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Check Order Status Success',
      async () => await this.orderService.checkStatus(id),
    );
  }
}
