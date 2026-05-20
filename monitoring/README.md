# Monitoring Infrastructure

This module handles the observability of the EC2 server and the applications running on it.
To keep things clean and separated from our application containers, monitoring tools are installed as native systemd services on the Ubuntu instance.

## Components
1. **Prometheus** (Port 9090): Time-series database that scrapes metrics from defined targets.
2. **Node Exporter** (Port 9100): Hardware and OS metrics exporter for Linux systems.
3. **Grafana** (Port 3001): Visualization platform connected to Prometheus to display beautiful dashboards.

## Architecture
```
[EC2 Server]
  │
  ├─ [System Services]
  │   ├─ Prometheus <──── Scrapes ──── Node Exporter (System Metrics)
  │   └─ Grafana    <──── Queries ──── Prometheus
  │
  └─ [Docker Compose]
      ├─ Frontend
      ├─ Backend
      └─ MySQL
```
