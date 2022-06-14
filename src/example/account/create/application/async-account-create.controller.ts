import { AsyncResponseAccountCreateDto } from "@app/example/account/create/application/dto/async-response-account-create.dto";
import { accountToCreateAccountProcessEvent } from "@app/example/account/create/application/dto/queue-account-create-process-event.dto";
import { RequestAccountCreateDto } from "@app/example/account/create/application/dto/request-account-create.dto";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class AsyncAccountCreateController extends BaseController<AsyncResponseAccountCreateDto> {
  constructor(private readonly enqueuer: Enqueuer) {
    super(AsyncAccountCreateController.name);
  }

  @ApiCreatedResponse({ type: AsyncResponseAccountCreateDto })
  @HttpMethodDecorator.post(HttpRoutes.ACCOUNT_CREATE_ASYNC)
  public async handle(
    @Body() requestCreateAccountDto: RequestAccountCreateDto,
  ): Promise<AsyncResponseAccountCreateDto> {
    const account = requestCreateAccountDto.toAccount();

    const createAccountEvent = accountToCreateAccountProcessEvent(account);

    await this.enqueuer.publish(createAccountEvent);

    return this.buildResponse({}, new AsyncResponseAccountCreateDto());
  }
}
