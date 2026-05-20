# Kubernetes Orchestration

This directory contains the Kubernetes manifests required to deploy the 3-tier application to a Kubernetes cluster (e.g., EKS, Minikube, or Kubeadm).

## Files Included
* `namespace.yaml`: Creates an isolated namespace.
* `configmap.yaml` & `secret.yaml`: Stores environment variables and sensitive credentials.
* `mysql-*`: StatefulSet/Deployment, PVC, and Headless Service for the database.
* `backend-*`: Deployment and Service for the Node.js API.
* `frontend-*`: Deployment and Service for the Nginx frontend.
* `ingress.yaml`: Rules to route external traffic to frontend/backend.

## Deployment Order
Execute the files in this order to ensure dependencies are met:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f ingress.yaml
```

**Note**: Don't forget to replace `your-dockerhub-username` in the deployment files with your actual DockerHub username.
