import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ErrorCode } from "@app/shared/http/error-code";
import { ResponseErrorDto } from "@app/shared/http/response-error.dto";
import { ExtendableLogger } from "@app/shared/logger/extendable-logger";
import { Controller, UnprocessableEntityException } from "@nestjs/common";
import { ApiUnprocessableEntityResponse } from "@nestjs/swagger";

@Controller(REQUEST_SCOPED)
@ApiUnprocessableEntityResponse({ type: ResponseErrorDto })
export abstract class BaseController<ResponseDto> extends ExtendableLogger {
  public buildResponse(
    useCaseResult: unknown,
    responseDto: BaseResponseDto,
  ): ResponseDto {
    this.checkError(useCaseResult);

    return responseDto.build(useCaseResult) as ResponseDto;
  }

  private checkError(executeResult: unknown): void {
    if (executeResult instanceof ErrorCode) {
      const responseError = new ResponseErrorDto(executeResult);

      throw new UnprocessableEntityException(responseError);
    }
  }
}
