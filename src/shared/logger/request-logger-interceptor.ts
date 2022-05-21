import { Logger } from "@app/shared/logger/logger";
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { v4 } from "uuid";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startTime = new Date().getTime();
    const req = context.switchToHttp().getRequest();
    const { originalUrl, headers, method, params, query, body } = req;

    headers["X-Request-ID"] = v4().toString();

    const splittedOriginalUrl = String(originalUrl).split("?");

    const requestData = {
      originalUrl: splittedOriginalUrl[0],
      queryString: splittedOriginalUrl[1],
      method,
      params,
      query,
      body,
    };
    /* istanbul ignore if */
    if (originalUrl === "/status") {
      //return next.handle();
    }

    Logger.log("API Request", "LoggingInterceptor", requestData);

    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = context.switchToHttp().getResponse();

        const responseTimeMs = new Date().getTime() - startTime;
        const responseData = { statusCode, data, responseTimeMs };

        Logger.log("API Response", "LoggingInterceptor", {
          requestData,
          responseData,
        });
      }),

      catchError((err) => {
        const responseTimeMs = new Date().getTime() - startTime;

        const responseData = {
          statusCode:
            /* istanbul ignore next */ err.status ??
            err.code ??
            HttpStatus.INTERNAL_SERVER_ERROR,
          responseTimeMs,
        };

        Logger.debug("API Response Error", "LoggingInterceptor", {
          requestData,
          responseData,
          err,
        });

        return throwError(() => err);
      }),
    );
  }
}
