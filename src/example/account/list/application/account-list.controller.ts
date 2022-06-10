import { RequestAccountListDto } from "@app/example/account/list/application/dto/request-account-list.dto";
import { ResponseAccountListDto } from "@app/example/account/list/application/dto/response-account-list.dto";
import { AccountListUseCase } from "@app/example/account/list/domain/account-list.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { Query } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.ACCOUNT)
export class CreateAccountController extends BaseController<ResponseAccountListDto> {
  constructor(private readonly useCase: AccountListUseCase) {
    super(CreateAccountController.name);
  }

  @ApiCreatedResponse({ type: ResponseAccountListDto })
  @HttpMethodDecorator.get(HttpRoutes.ACCOUNT_LIST)
  public async handle(
    @Query() requestAccountListDto: RequestAccountListDto,
  ): Promise<ResponseAccountListDto> {
    this.log("Starting");

    const filter = requestAccountListDto.toAccountListFilter();

    const executeResult = await this.useCase.execute(filter);

    return this.buildResponse(executeResult, new ResponseAccountListDto());
  }
}
