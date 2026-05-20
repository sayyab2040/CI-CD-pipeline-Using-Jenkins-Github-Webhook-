# Kubernetes Orchestration Report

While Docker Compose is used for the primary CI/CD pipeline in this lab, complete Kubernetes manifests are provided for a scalable, enterprise-grade deployment.

## Architecture Mapping
* **Containers** become **Pods** managed by **Deployments**.
* **Docker Compose Networks** become Kubernetes **Services**.
* **Docker Volumes** become **PersistentVolumeClaims (PVCs)**.
* **.env variables** become **ConfigMaps** and **Secrets**.

## Manifests Provided
* `namespace.yaml`: Logical isolation for the project.
* `secret.yaml`: Securely stores the MySQL root password and user credentials (Base64 encoded).
* `configmap.yaml`: Stores non-sensitive data like database host names.
* `mysql-*`: Includes a PVC for data persistence, a Deployment, and a Headless Service for internal cluster resolution.
* `backend-*`: Deployment (2 replicas) and a ClusterIP Service. Includes Readiness Probes to ensure traffic isn't routed until the API is healthy.
* `frontend-*`: Deployment (2 replicas) and a NodePort Service.
* `ingress.yaml`: Defines routing rules to expose both the frontend and backend API to the outside world through a single entry point.
