import { AsyncResponseCreateAccountDto } from "@app/example/application/dto/async-response-crate-account.dto";
import { RequestCreateAccountDto } from "@app/example/application/dto/request-create-account.dto";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class AsyncCreateAccountController extends BaseController<AsyncResponseCreateAccountDto> {
  constructor(private readonly enqueuer: Enqueuer) {
    super(AsyncCreateAccountController.name);
  }

  @ApiCreatedResponse({ type: AsyncResponseCreateAccountDto })
  @HttpMethodDecorator.post(HttpRoutes.ACCOUNT_CREATE_ASYNC)
  public async handle(
    @Body() requestCreateAccountDto: RequestCreateAccountDto,
  ): Promise<AsyncResponseCreateAccountDto> {
    this.log("Starting");

    const account = requestCreateAccountDto.toAccount();

    await this.enqueuer.publish(QueueTopics.CREATE_ACCOUNT_PROCESS, account);

    return this.buildResponse({}, new AsyncResponseCreateAccountDto());
  }
}
