import { RequestAccountCreateDto } from "@app/example/account/create/application/dto/request-account-create.dto";
import { ResponseAccountCreateDto } from "@app/example/account/create/application/dto/response-account-crate.dto";
import { AccountCreateUseCase } from "@app/example/account/create/domain/account-create.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Body } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class AccountCreateController extends BaseController<ResponseAccountCreateDto> {
  constructor(private readonly createAccountUseCase: AccountCreateUseCase) {
    super(AccountCreateController.name);
  }

  @ApiCreatedResponse({ type: ResponseAccountCreateDto })
  @HttpMethodDecorator.post(HttpRoutes.ACCOUNT_CREATE)
  public async handle(
    @Body() requestCreateAccountDto: RequestAccountCreateDto,
  ): Promise<ResponseAccountCreateDto> {
    const account = requestCreateAccountDto.toAccount();

    const executeResult = await this.createAccountUseCase.execute(account);

    return this.buildResponse(executeResult, new ResponseAccountCreateDto());
  }
}
