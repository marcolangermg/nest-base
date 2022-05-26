import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/decorator/http-method.decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { SwaggerTagDecorator } from "@app/shared/swagger/swagger-tag.decorator";
import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { StatusResponseDto } from "@app/status/application/dto/status-response.dto";
import { ApiOkResponse } from "@nestjs/swagger";

@SwaggerTagDecorator.apiTags(SwaggerTags.SYSTEM)
export class StatusController extends BaseController<StatusResponseDto> {
  constructor() {
    super(StatusController.name);
  }

  @ApiOkResponse({ type: StatusResponseDto })
  @HttpMethodDecorator.get(HttpRoutes.STATUS)
  public handler() {
    return this.buildResponse(true, new StatusResponseDto());
  }
}
