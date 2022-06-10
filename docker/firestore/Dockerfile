FROM google/cloud-sdk:alpine as firestore
RUN apk --update add openjdk8-jre
RUN gcloud components install cloud-firestore-emulator beta --quiet
EXPOSE ${FIRESTORE_PORT}
ENTRYPOINT [`gcloud config set project ${FIRESTORE_PROJECT_ID} && gcloud beta emulators firestore start \
  --host-port=${FIRESTORE_LISTEN_ADDRESS}`]
HEALTHCHECK --interval=5s --timeout=3s --start-period=15s --retries=5\
  CMD curl -f http://localhost:${FIRESTORE_PORT} || exit 1
