import { queueEventDtoList } from "@app/shared/queue/application/dto/queue-event-dto-list";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export class QueueEvent {
  topicName: QueueTopics;
  private validData!: { [k: string]: string };

  constructor(topicName: QueueTopics, data: { [k: string]: string }) {
    this.topicName = topicName;
    this.data = data;
  }

  set data(data: { [k: string]: string }) {
    const zodObject = queueEventDtoList[this.topicName];

    zodObject.parse(data);

    this.validData = data;
  }

  get data() {
    return this.validData;
  }
}
