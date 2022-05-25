export abstract class BaseResponseDto {
  abstract build(props: unknown): unknown;
}
