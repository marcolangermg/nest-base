import { RequestOrderListDto } from "@app/example/order/list/application/dto/request-order-list.dto";
import { ResponseOrderListDto } from "@app/example/order/list/application/dto/response-order-list.dto";
import { OrderListUseCase } from "@app/example/order/list/domain/order-list.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Query } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ORDER)
export class CreateOrderController extends BaseController<ResponseOrderListDto> {
  constructor(private readonly useCase: OrderListUseCase) {
    super(CreateOrderController.name);
  }

  @ApiCreatedResponse({ type: ResponseOrderListDto })
  @HttpMethodDecorator.get(HttpRoutes.ORDER_LIST)
  public async handle(
    @Query() requestOrderListDto: RequestOrderListDto,
  ): Promise<ResponseOrderListDto> {
    const filter = requestOrderListDto.toOrderListFilter();

    const executeResult = await this.useCase.execute(filter);

    return this.buildResponse(executeResult, new ResponseOrderListDto());
  }
}
