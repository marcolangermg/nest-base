import { Test, TestingModule } from '@nestjs/testing';
import { PubSubQueueInitializer } from '../application/pub-sub-queue-initializer';
import { ApplicationSettings } from '@app/settings/application-settings';
import { PubSubHttpClient } from '@app/shared/pub-sub/application/pub-sub-http-client';
import { QueueTopics } from '@app/shared/queue/domain/queue-topics';
import { pubSubSubscriptionList } from '@app/shared/pub-sub/test/pub-sub-subscription-list';

// Mock PubSubHttpClient
jest.mock('@app/shared/pub-sub/application/pub-sub-http-client');

describe('PubSubQueueInitializer', () => {
  let service: PubSubQueueInitializer;
  let pubSubHttpClient: jest.Mocked<PubSubHttpClient>;
  let mockSettings: ApplicationSettings;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    mockSettings = {
      pubSub: {
        apiEndpoint: 'https://pubsub.googleapis.com',
        projectId: 'test-project-id',
      },
    } as ApplicationSettings;

    (PubSubHttpClient as jest.Mock).mockImplementation(() => {
      return {
        createTopic: jest.fn().mockResolvedValue({}),
        subscribe: jest.fn().mockResolvedValue({}),
        log: jest.fn(),
      };
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PubSubQueueInitializer,
        {
          provide: ApplicationSettings,
          useValue: mockSettings,
        },
      ],
    }).compile();

    service = module.get<PubSubQueueInitializer>(PubSubQueueInitializer);
    pubSubHttpClient = (PubSubHttpClient as unknown) as jest.Mocked<PubSubHttpClient>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call createTopics and subscribeToQueue', async () => {
      const createTopicsSpy = jest.spyOn<any, any>(service, 'createTopics').mockResolvedValue(undefined);
      const subscribeToQueueSpy = jest.spyOn<any, any>(service, 'subscribeToQueue').mockResolvedValue(undefined);

      await service.onModuleInit();

      expect(createTopicsSpy).toHaveBeenCalledTimes(1);
      expect(subscribeToQueueSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTopics', () => {
    it('should create all topics successfully', async () => {
      const createTopicsMethod = (service as any).createTopics.bind(service);
      
      (service as any).pubSubHttpClient.createTopic = jest.fn().mockResolvedValue({});
      
      await createTopicsMethod();
      
      const topics = Object.values(QueueTopics);
      expect((service as any).pubSubHttpClient.createTopic).toHaveBeenCalledTimes(topics.length);
      
      topics.forEach(topic => {
        expect((service as any).pubSubHttpClient.createTopic).toHaveBeenCalledWith(topic);
      });
    });

    it('should handle already existing topics', async () => {
      const createTopicsMethod = (service as any).createTopics.bind(service);
      
      (service as any).pubSubHttpClient.createTopic = jest.fn().mockRejectedValue({ code: 6, message: 'Topic already exists' });
      
      await expect(createTopicsMethod()).resolves.not.toThrow();
      
      const topics = Object.values(QueueTopics);
      expect((service as any).pubSubHttpClient.createTopic).toHaveBeenCalledTimes(topics.length);
    });

    it('should throw error for non-ALREADY_EXISTS errors', async () => {
      const createTopicsMethod = (service as any).createTopics.bind(service);
      
      const error = { code: 5, message: 'Some other error' };
      (service as any).pubSubHttpClient.createTopic = jest.fn().mockRejectedValue(error);
      
      await expect(createTopicsMethod()).rejects.toEqual(error);
      await expect(createTopicsMethod()).rejects.toEqual(error);
    });
  });

  describe('subscribeToQueue', () => {
    it('should subscribe to all queues successfully', async () => {
      const subscribeToQueueMethod = (service as any).subscribeToQueue.bind(service);
      
      (service as any).pubSubHttpClient.subscribe = jest.fn().mockResolvedValue({});
      
      await subscribeToQueueMethod();
      
      expect((service as any).pubSubHttpClient.subscribe).toHaveBeenCalledTimes(pubSubSubscriptionList.length);
      
      pubSubSubscriptionList.forEach(subscription => {
        expect((service as any).pubSubHttpClient.subscribe).toHaveBeenCalledWith(expect.objectContaining({
          topic: subscription.topic,
          subscriptionName: subscription.subscriptionName,
          ackDeadlineSeconds: subscription.ackDeadlineSeconds,
          retainAckedMessages: subscription.retainAckedMessages,
          retryPolicy: expect.objectContaining({
            minimumBackoff: expect.anything(),
            maximumBackoff: expect.anything(),
          }),
          pushConfig: subscription.pushConfig,
        }));
      });
    });

    it('should handle already existing subscriptions', async () => {
      const subscribeToQueueMethod = (service as any).subscribeToQueue.bind(service);
      
      (service as any).pubSubHttpClient.subscribe = jest.fn().mockRejectedValue({ code: 6, message: 'Subscription already exists' });
      
      await expect(subscribeToQueueMethod()).resolves.not.toThrow();
      
      expect((service as any).pubSubHttpClient.subscribe).toHaveBeenCalledTimes(pubSubSubscriptionList.length);
    });

    it('should throw error for non-ALREADY_EXISTS errors', async () => {
      const subscribeToQueueMethod = (service as any).subscribeToQueue.bind(service);
      
      const error = { code: 5, message: 'Some other error' };
      (service as any).pubSubHttpClient.subscribe = jest.fn().mockRejectedValue(error);
      
      await expect(subscribeToQueueMethod()).rejects.toEqual(error);
    });
  });
});
