import { ProcessCreateAccountDto } from "@app/example/application/dto/process-create-account.dto";
import { CreateAccountUseCase } from "@app/example/domain/create-account.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueReceiveDto } from "@app/shared/queue/application/dto/queue-receive.dto";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class ProcessCreateAccountController extends BaseController<QueueReceiveDto> {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {
    super(ProcessCreateAccountController.name);
  }

  @ApiCreatedResponse({ type: QueueReceiveDto })
  @HttpMethodDecorator.post(HttpRoutes.ACCOUNT_CREATE_PROCESS)
  public async handle(
    @Body() processCreateAccountDto: ProcessCreateAccountDto,
  ): Promise<QueueReceiveDto> {
    this.log("Starting");

    const account = processCreateAccountDto.toAccount();

    const executeResult = await this.createAccountUseCase.execute(account);

    return this.buildResponse(executeResult, new QueueReceiveDto());
  }
}
