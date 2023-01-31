FROM google/cloud-sdk:183.0.0-alpine as pubSub
RUN apk --update add openjdk8-jre
RUN gcloud components install pubsub-emulator beta --quiet
VOLUME /opt/data
EXPOSE ${PUBSUB_PORT}
ENTRYPOINT [`gcloud config set project ${PUBSUB_PROJECT_ID} && gcloud beta emulators pubsub start \
  --data-dir=/opt/data \
  --host-port=${PUBSUB_LISTEN_ADDRESS}`]
HEALTHCHECK --interval=5s --timeout=3s --start-period=15s --retries=5\
  CMD curl -f http://localhost:${PUBSUB_PORT} || exit 1
