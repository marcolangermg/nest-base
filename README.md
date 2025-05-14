## Description
Order Service based on NestJS

## Installation

```bash
$ npm install
```

## Running the app

### Local Development

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Using Docker

```bash
# Build and start all containers in detached mode
$ docker compose -f docker-compose.yml up -d --build

# Stop all containers
$ docker compose down
```

### Viewing Application Logs

```bash
# Find the container ID for the API service
$ docker ps

# View logs for the API container (replace CONTAINER_ID with actual ID)
$ docker logs -f CONTAINER_ID

# Alternative: connect directly to the api_dev container
$ docker logs -f api_dev
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Documentation

### API Documentation
[Swagger UI](http://localhost:3000/api) - Available when the application is running

### Code Documentation

This project uses [Compodoc](https://compodoc.app/) to generate detailed code documentation.

```bash
# Generate and serve documentation
$ npm run compoDoc
```

After running the command, you can access the documentation at:
[http://localhost:8080](http://localhost:8080)

The documentation includes:
- Project structure visualization
- Module dependencies
- Components and services documentation
- Class and method details

## Microservice Architecture

### Overview
This project follows a modular microservice architecture based on NestJS. It's designed to handle order processing with event-driven communication using PubSub and data persistence with Firestore.

### Key Components

#### Docker Services
- **API Service**: NestJS application running the business logic
- **PubSub Emulator**: Handles asynchronous event messaging between services
- **Firestore Emulator**: NoSQL database for data persistence

#### Application Structure
- **Domain-Driven Modules**: Each business domain is organized into its own module (e.g., Order)
- **Feature-Based Organization**: Within each domain, features are separated (e.g., create, list)
- **Clean Architecture**: Each feature follows a layered approach:
  - `application`: Contains controllers, services, and use cases
  - `domain`: Contains entities, interfaces, and business rules
  - `shared`: Contains common code shared across features

#### Communication Patterns
- **HTTP REST API**: For synchronous client communication
- **PubSub Events**: For asynchronous processing and service-to-service communication
- **Push Endpoints**: Configured to receive events from PubSub

### Development Workflow
1. Define domain entities and business rules
2. Implement application services and controllers
3. Configure PubSub topics and subscriptions for event-driven flows
4. Set up Firestore repositories for data persistence

## Environment Configuration

### Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVICE_BASE_URL` | Base URL for the service | http://api_dev:3000 |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_LISTEN_PORT` | Port the application listens on | 3000 |
| `ENABLE_API_DOCUMENTATION` | Enable Swagger documentation | true |
| `LOG_LEVEL` | Application logging level | debug |
| `PUB_SUB_API_ENDPOINT` | PubSub emulator endpoint | http://pubSub:8085 |
| `PUB_SUB_PROJECT_ID` | Google Cloud project ID for PubSub | dummy-project-id |
| `FIRESTORE_PROJECT_ID` | Google Cloud project ID for Firestore | dummy-project-id |
| `FIRESTORE_EMULATOR_HOST` | Firestore emulator host | firestore:8086 |

### Configuration Files

- `.env`: Main environment configuration file
- `docker-compose.yml`: Docker services configuration
