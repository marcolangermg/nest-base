import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("System")
@Controller("status")
export class StatusController {
  @Get()
  check() {
    return { status: true };
  }
}
