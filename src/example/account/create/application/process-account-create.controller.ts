import { ProcessAccountCreateDto } from "@app/example/account/create/application/dto/process-account-create.dto";
import { AccountCreateUseCase } from "@app/example/account/create/domain/account-create.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueReceiveDto } from "@app/shared/queue/application/dto/queue-receive.dto";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class ProcessAccountCreateController extends BaseController<QueueReceiveDto> {
  constructor(private readonly accountCreateUseCase: AccountCreateUseCase) {
    super(ProcessAccountCreateController.name);
  }

  @ApiCreatedResponse({ type: QueueReceiveDto })
  @HttpMethodDecorator.post(HttpRoutes.ACCOUNT_CREATE_PROCESS)
  public async handle(
    @Body() processCreateAccountDto: ProcessAccountCreateDto,
  ): Promise<QueueReceiveDto> {
    this.log("Starting");

    const account = processCreateAccountDto.toAccount();

    const executeResult = await this.accountCreateUseCase.execute(account);

    return this.buildResponse(executeResult, new QueueReceiveDto());
  }
}
