import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async detail(@Param('id') id: string): Promise<ResponseDto<OrderDTO>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Get Order Info Success',
      async () => {
        const response = await this.orderService.getById(id);
        this.logger.log(response);
        return response;
      },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CREATE)
  async create(@Body() body: CreateOrderDTO): Promise<ResponseDto<OrderDTO>> {
    return this.ApiResponse(HttpStatus.OK, 'Create Order Success', async () => {
      const response = await this.orderService.create(body);
      return response;
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CANCEL)
  async cancel(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    return this.ApiResponse(HttpStatus.OK, 'Cancel Order Success', async () => {
      const response = await this.orderService.cancel(id);
      return response;
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post(ORDER_ROUTES.CHECK_STATUS)
  async checkOrderStatus(
    @Param('id') id: string,
  ): Promise<ResponseDto<ORDER_STATUS>> {
    return this.ApiResponse(
      HttpStatus.OK,
      'Check Order Status Success',
      async () => {
        const response = await this.orderService.checkStatus(id);
        return response;
      },
    );
  }
}
