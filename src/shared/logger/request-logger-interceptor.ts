import { Logger, LogLevel } from "@app/shared/logger/logger";
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startTime = new Date().getTime();
    const req = context.switchToHttp().getRequest();
    const { originalUrl, method, params, query, body } = req;

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
      return next.handle();
    }

    Logger.log({
      message: "API Request",
      context: "LoggingInterceptor",
      logData: requestData,
    });

    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = context.switchToHttp().getResponse();

        const responseTimeMs = new Date().getTime() - startTime;
        const responseData = { statusCode, data, responseTimeMs };

        Logger.log({
          message: "API Response",
          context: "LoggingInterceptor",
          logData: {
            requestData,
            responseData,
          },
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

        Logger.log({
          message: "API Response Error",
          context: "LoggingInterceptor",
          logData: {
            requestData,
            responseData,
            err,
          },
          level: LogLevel.DEBUG,
        });

        return throwError(() => err);
      }),
    );
  }
}
