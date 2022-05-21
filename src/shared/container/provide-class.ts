import { Abstract, Provider, Scope, Type } from "@nestjs/common";

export const provideClass = <T>(
  abstract: Abstract<T>,
  concrete: Type<T>,
  scope?: Scope,
): Provider => ({
  provide: abstract,
  useClass: concrete,
  scope,
});
