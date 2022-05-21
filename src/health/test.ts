import { Injectable, Scope } from "@nestjs/common";

export abstract class TestService {}

@Injectable({ scope: Scope.REQUEST })
export class MambuTestService {}
