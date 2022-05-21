import { config } from "@app/settings/application-config";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function swaggerConfig(app: INestApplication): void {
  if (!config.app.enableApiDocumentation) {
    return;
  }

  const swaggerConfiguration = new DocumentBuilder()
    .setTitle(config.app.name)
    .setDescription(config.app.name)
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup("api", app, document);
}
