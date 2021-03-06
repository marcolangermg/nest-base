import { config } from "@app/settings/application-config";
import { redactList } from "@app/shared/logger/logger-redact-config";
import { LoggerModule } from "nestjs-pino";
import { v4 as uuidV4 } from "uuid";

export const loggerConfig = LoggerModule.forRoot({
  pinoHttp: {
    genReqId: () => {
      return { requestId: uuidV4() };
    },
    name: config.app.name,
    level: config.app.logLevel,
    autoLogging: false,
    redact: {
      paths: redactList,
      censor: "****censored****",
    },
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        singleLine: true,
        levelFirst: false,
        translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
        messageFormat: "[RequestId:{req.id.requestId}] [{context}] {msg}",
        ignore: "pid,hostname,req,res,responseTime",
        errorLikeObjectKeys: ["err", "error"],
      },
    },
  },
});
