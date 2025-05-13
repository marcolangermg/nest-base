import { AsyncResponseOrderCreateDto } from "@app/example/order/create/application/dto/async-response-order-create.dto";
import { orderToCreateOrderProcessEvent } from "@app/example/order/create/application/dto/queue-order-create-process-event.dto";
import { RequestOrderCreateDto } from "@app/example/order/create/application/dto/request-order-create.dto";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ORDER)
export class AsyncOrderCreateController extends BaseController<AsyncResponseOrderCreateDto> {
  constructor(private readonly enqueuer: Enqueuer) {
    super(AsyncOrderCreateController.name);
  }

  @ApiCreatedResponse({ type: AsyncResponseOrderCreateDto })
  @HttpMethodDecorator.post(HttpRoutes.ORDER_CREATE_ASYNC)
  public async handle(
    @Body() requestCreateOrderDto: RequestOrderCreateDto,
  ): Promise<AsyncResponseOrderCreateDto> {
    const order = requestCreateOrderDto.toOrder();

    const createOrderEvent = orderToCreateOrderProcessEvent(order);

    await this.enqueuer.publish(createOrderEvent);

    return this.buildResponse({}, new AsyncResponseOrderCreateDto());
  }
}
