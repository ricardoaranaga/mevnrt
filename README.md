# MEVN-RT Stack Application

This is a full-stack web application built with the MEVN-RT stack:

*   **M**ongoDB: NoSQL database
*   **E**xpress.js: Back-end web application framework for Node.js
*   **V**ue.js: Front-end JavaScript framework
*   **N**ode.js: Back-end JavaScript runtime environment
*   **R**edis: In-memory data structure store
*   **T**raefik: Cloud-native application proxy

The application is containerized using Docker and managed with Docker Compose.

## Services

The project is composed of the following services:

| Service        | Description                                                                                                                              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `traefik`      | A Traefik instance that acts as a reverse proxy to route incoming traffic to the appropriate service (`api-server` or `vue-client`).       |
| `vue-client`   | A Vue.js single-page application that provides the user interface. It is built with Vite and uses Tailwind CSS for styling.              |
| `api-server`   | A Node.js/Express.js application that provides the REST API for the application. It connects to MongoDB for data persistence and Redis.    |
| `mongo`        | A MongoDB instance for the database.                                                                                                     |
| `redis`        | A Redis instance for caching and other in-memory data storage needs.                                                                     |
| `redis-server` | A Node.js application that communicates with the Redis service.                                                                            |

## Getting Started

To get the application up and running, you will need to have Docker and Docker Compose installed.

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd mevnrt
    ```

3.  Start the application using Docker Compose:

    ```bash
    docker-compose up --build
    ```

This will build the Docker images for each service, install the dependencies, and start the containers. The application will be accessible at `http://localhost`.

## Project Structure

The project is organized into the following directories:

*   `api-server/`: Contains the back-end application code.
*   `client/`: Contains the front-end application code.
*   `redis-server/`: Contains the Node.js application that interacts with Redis.
*   `reverse-proxy/`: Contains the configuration for the Traefik reverse proxy.
*   `docker-compose.yml`: Defines the services, networks, and volumes for the Docker application.