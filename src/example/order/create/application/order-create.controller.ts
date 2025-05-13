import { RequestOrderCreateDto } from "@app/example/order/create/application/dto/request-order-create.dto";
import { ResponseOrderCreateDto } from "@app/example/order/create/application/dto/response-order-crate.dto";
import { OrderCreateUseCase } from "@app/example/order/create/domain/order-create.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ORDER)
export class OrderCreateController extends BaseController<ResponseOrderCreateDto> {
  constructor(private readonly createOrderUseCase: OrderCreateUseCase) {
    super(OrderCreateController.name);
  }

  @ApiCreatedResponse({ type: ResponseOrderCreateDto })
  @HttpMethodDecorator.post(HttpRoutes.ORDER_CREATE)
  public async handle(
    @Body() requestCreateOrderDto: RequestOrderCreateDto,
  ): Promise<ResponseOrderCreateDto> {
    const order = requestCreateOrderDto.toOrder();

    const executeResult = await this.createOrderUseCase.execute(order);

    return this.buildResponse(executeResult, new ResponseOrderCreateDto());
  }
}
