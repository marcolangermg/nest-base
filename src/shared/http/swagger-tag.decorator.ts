import { SwaggerTags } from "@app/shared/http/swagger-tags";
import { ApiTags } from "@nestjs/swagger";

export class SwaggerTagDecorator {
  public static apiTags(tag: SwaggerTags): ClassDecorator {
    return ApiTags(tag);
  }
}
