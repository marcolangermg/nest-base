import { BaseController } from "@app/shared/base-classes/base-controller";
import { HttpMethodDecorator } from "@app/shared/http/http-method-decorator";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { StatusResponseDto } from "@app/status/application/dto/status-response.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("System")
export class StatusController extends BaseController<StatusResponseDto> {
  constructor() {
    super(StatusController.name);
  }

  @HttpMethodDecorator.get(HttpRoutes.STATUS)
  check() {
    return this.buildResponse(true, new StatusResponseDto());
  }
}
