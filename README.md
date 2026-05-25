# FullStack Spring Boot + React + MariaDB Dockerized Application

## Description

Cette application est une application FullStack de gestion automobile développée avec :

- Spring Boot pour le backend
- React pour le frontend
- MariaDB pour la base de données
- Docker et Docker Compose pour la conteneurisation
- Kubernetes (Minikube) pour l'orchestration des conteneurs

L'objectif du projet est de proposer une plateforme moderne permettant la gestion des véhicules avec une interface web responsive et une architecture conteneurisée.

---

# Architecture

```text
Frontend React  →  Backend Spring Boot  →  MariaDB
```

---

# Technologies utilisées

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

## Base de données

- MariaDB

## DevOps & Conteneurisation

- Docker
- Docker Compose
- Nginx
- Kubernetes (Minikube)

---

# Fonctionnalités principales

## Gestion des voitures

- Ajouter une voiture
- Modifier une voiture
- Supprimer une voiture
- Afficher la liste des voitures
- Consulter les informations des véhicules

## Authentification

- Création de compte
- Connexion utilisateur
- Déconnexion

## Estimation intelligente des prix

L'application propose une estimation simple du prix des véhicules basée sur :

- l'année du véhicule
- le prix
- le type de véhicule

Cette fonctionnalité représente une petite intégration d'IA métier permettant d'aider l'utilisateur dans l'évaluation des véhicules.

## Interface utilisateur

- Interface responsive
- Dashboard moderne
- Design sombre professionnel
- Navigation simplifiée

---

# Conteneurs Docker

## Backend Container

Contient l'application Spring Boot compilée en `.jar`.

## Frontend Container

Contient l'application React buildée et servie avec Nginx.

## MariaDB Container

Contient la base de données persistante.

---

# Volumes Docker

Un volume Docker est utilisé afin de conserver les données MariaDB même après l'arrêt ou la suppression des conteneurs.

---

# Installation du projet

## 1. Cloner le repository

```bash
git clone https://github.com/FatihaKhassil/fullstack-springboot-react-docker.git
```

---

## 2. Entrer dans le dossier du projet

```bash
cd fullstack-springboot-react-docker
```

---

## 3. Lancer les conteneurs Docker

```bash
docker compose up --build
```

---

# Accès à l'application

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

# Structure du projet

```text
├── src                          → Backend Spring Boot
├── myapp                        → Frontend React
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

# Commandes utiles

## Arrêter les conteneurs

```bash
docker compose down
```

## Relancer les conteneurs

```bash
docker compose up --build
```

## Voir les logs Docker

```bash
docker compose logs
```

---

# Déploiement Kubernetes

## Prérequis
- Minikube installé
- kubectl installé
- Docker installé

## Windows
```powershell
./deploy-k8s.ps1
```

## Linux/Mac
```bash
bash deploy-k8s.sh
```

## Accéder à l'API
L'URL est affichée automatiquement à la fin du script.
Ouvrir dans le navigateur :
```text
http://127.0.0.1:PORT/api/voitures
```

## Dashboard Kubernetes
```bash
minikube dashboard
```

---

Fatiha KHASSIL  
ENSIAS — Data & Software Engineering