export abstract class EnqueueEvent {
  public abstract toEvent(): { [k: string]: string };
}
