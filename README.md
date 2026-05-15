# FullStack Spring Boot + React + MariaDB Dockerized Application

## Description

Cette application est une application FullStack composée de :

* Backend : Spring Boot
* Frontend : React
* Base de données : MariaDB
* Conteneurisation : Docker & Docker Compose

L’objectif est de lancer toute l’architecture avec une seule commande :

```bash
docker compose up --build
```

## Architecture

```text
Frontend React  →  Backend Spring Boot  →  MariaDB
```

## Technologies utilisées

### Backend

* Spring Boot
* Spring Data REST
* JPA / Hibernate
* MariaDB

### Frontend

* React
* React Bootstrap
* Axios
* React Router

### DevOps

* Docker
* Docker Compose
* Nginx

## Conteneurs Docker

### Backend Container

Contient l’application Spring Boot compilée en `.jar`.

### Frontend Container

Contient l’application React buildée et servie par Nginx.

### MariaDB Container

Contient la base de données persistante.

## Lancer le projet

À la racine du projet :

```bash
docker compose up --build
```

## Accès

### Frontend

```text
http://localhost:3000
```

### Backend API

```text
http://localhost:9090/api
```

### MariaDB

```text
localhost:3307
```

## Fonctionnalités

* Ajouter une voiture
* Modifier une voiture
* Supprimer une voiture
* Afficher la liste des voitures

## Volumes Docker

Un volume Docker est utilisé pour conserver les données MariaDB même après suppression des conteneurs.
