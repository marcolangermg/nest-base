import { RequestCreateAccountDto } from "@app/example/application/dto/request-create-account.dto";
import { ResponseCreateAccountDto } from "@app/example/application/dto/response-crate-account.dto";
import { CreateAccountUseCase } from "@app/example/domain/create-account.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { SwaggerTagDecorator } from "@app/shared/http/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/http/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class CreateAccountController extends BaseController<ResponseCreateAccountDto> {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {
    super(CreateAccountController.name);
  }

  @ApiCreatedResponse({ type: ResponseCreateAccountDto })
  @HttpMethodDecorator.post(HttpRoutes.ACCOUNT_CREATE)
  public async handle(
    @Body() requestCreateAccountDto: RequestCreateAccountDto,
  ): Promise<ResponseCreateAccountDto> {
    this.log("Starting");

    const account = requestCreateAccountDto.toAccount();

    const executeResult = await this.createAccountUseCase.execute(account);

    return this.buildResponse(executeResult, new ResponseCreateAccountDto());
  }
}
