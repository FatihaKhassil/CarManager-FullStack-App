#!/bin/bash
minikube start
eval $(minikube docker-env)
docker build -t springboot-backend:1.0 -f Dockerfile.backend .
kubectl apply -f mariadb-configmap.yaml
kubectl apply -f mariadb-secrets.yaml
kubectl apply -f db-deployment.yaml
kubectl apply -f app-deployment.yaml
kubectl get pods
minikube service springboot-crud-svc --url
