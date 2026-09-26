# CarManager — FullStack App (Spring Boot + React + MariaDB)

## Description

This is a FullStack car management application built with:

- Spring Boot for the backend
- React for the frontend
- MariaDB for the database
- Docker and Docker Compose for containerization
- Kubernetes (Minikube) for container orchestration

The goal of the project is to provide a modern platform for managing vehicles, with a responsive web interface and a containerized architecture.

---

# Architecture

```text
React Frontend  →  Spring Boot Backend  →  MariaDB
```

---

# Technologies Used

## Backend

- Spring Boot
- Spring Data REST
- Spring Web
- Spring Data JPA
- Hibernate
- MariaDB Connector
- Maven

## Frontend

- React
- React Bootstrap
- Axios
- React Router DOM

## Database

- MariaDB

## DevOps & Containerization

- Docker
- Docker Compose
- Nginx
- Kubernetes (Minikube)

---

# Main Features

## Car Management

- Add a car
- Edit a car
- Delete a car
- Display the list of cars
- View vehicle details

## Authentication

- Account creation
- User login
- Logout

## Smart Price Estimation

The application provides an intelligent price analysis for vehicles based on:

- The vehicle's brand and model
- The manufacturing year
- The listed price

The analysis returns:
- **High price**: the price exceeds the normal value for this type of vehicle, along with negotiation tips
- **Fair price**: the price matches the market, along with buying tips
- **Low price**: the price is below market value, along with verification tips

Each analysis comes with **personalized advice** to help the user make a buying decision.

## User Interface

- Responsive interface
- Modern dashboard
- Professional dark design
- Simplified navigation

---

# Docker Containers

## Backend Container

Contains the Spring Boot application compiled as a `.jar`.

## Frontend Container

Contains the built React application served with Nginx.

## MariaDB Container

Contains the persistent database.

---

# Docker Volumes

A Docker volume is used to persist MariaDB data even after containers are stopped or removed.

---

# Project Installation

## 1. Clone the repository

```bash
git clone https://github.com/FatihaKhassil/fullstack-springboot-react-docker.git
```

---

## 2. Enter the project folder

```bash
cd fullstack-springboot-react-docker
```

---

## 3. Start the Docker containers

```bash
docker compose up --build
```

---

# Accessing the Application

## Frontend

```text
http://localhost:3000
```

## Backend API

```text
http://localhost:9090/api
```

## MariaDB

```text
localhost:3307
```

---

# Project Structure

```text
├── src                          → Spring Boot backend
├── myapp                        → React frontend
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── mariadb-configmap.yaml       → Kubernetes ConfigMap
├── mariadb-secrets.yaml         → Kubernetes Secrets
├── db-deployment.yaml           → Kubernetes MariaDB Deployment
├── app-deployment.yaml          → Kubernetes Spring Boot Deployment
├── pom.xml
├── README.md
└── HELP.md
```

---

# Useful Commands

## Stop the containers

```bash
docker compose down
```

## Restart the containers

```bash
docker compose up --build
```

## View Docker logs

```bash
docker compose logs
```

---

# Kubernetes Deployment

## Prerequisites
- Minikube installed
- kubectl installed
- Docker installed

## Windows
```powershell
./deploy-k8s.ps1
```

## Linux/Mac
```bash
bash deploy-k8s.sh
```

## Accessing the API
The URL is automatically displayed at the end of the script.
Open in the browser:
```text
http://127.0.0.1:PORT/api/voitures
```

## Kubernetes Dashboard
```bash
minikube dashboard
```

---

Fatiha KHASSIL  
ENSIAS — Data & Software Engineering
