import { SwaggerTags } from "@app/shared/swagger/swagger-tags";
import { ApiTags } from "@nestjs/swagger";

export class SwaggerTagDecorator {
  public static apiTags(tag: SwaggerTags): ClassDecorator {
    return ApiTags(tag);
  }
}
