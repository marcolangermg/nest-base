import { HttpRoutes } from "@app/shared/http/http-routes";
import { Get as NestGet, Post as NestPost } from "@nestjs/common";

export class HttpMethodDecorator {
  public static post(httpRoutes: HttpRoutes): MethodDecorator {
    return NestPost(httpRoutes);
  }

  public static get(httpRoutes: HttpRoutes): MethodDecorator {
    return NestGet(httpRoutes);
  }
}
