import { RequestCreateAccountDto } from "@app/example/application/dto/request-create-account.dto";
import { ResponseCreateAccountDto } from "@app/example/application/dto/response-crate-account.dto";
import { CreateAccountUseCase } from "@app/example/domain/create-account.use-case";
import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/http-method-decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { Body } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Account")
@ApiResponse({ type: ResponseCreateAccountDto })
export class CreateAccountController extends BaseController<ResponseCreateAccountDto> {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {
    super(CreateAccountController.name);
  }

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
