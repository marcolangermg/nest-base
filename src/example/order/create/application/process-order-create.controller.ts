import { ProcessOrderCreateDto } from "@app/example/order/create/application/dto/process-order-create.dto";
import { OrderCreateUseCase } from "@app/example/order/create/domain/order-create.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueReceiveDto } from "@app/shared/queue/application/dto/queue-receive.dto";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ORDER)
export class ProcessOrderCreateController extends BaseController<QueueReceiveDto> {
  constructor(private readonly orderCreateUseCase: OrderCreateUseCase) {
    super(ProcessOrderCreateController.name);
  }

  @ApiCreatedResponse({ type: QueueReceiveDto })
  @HttpMethodDecorator.post(HttpRoutes.ORDER_CREATE_PROCESS)
  public async handle(
    @Body() processCreateOrderDto: ProcessOrderCreateDto,
  ): Promise<QueueReceiveDto> {
    const order = processCreateOrderDto.toOrder();

    const executeResult = await this.orderCreateUseCase.execute(order);

    return this.buildResponse(executeResult, new QueueReceiveDto());
  }
}
