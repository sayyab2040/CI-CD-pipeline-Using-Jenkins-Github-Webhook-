# Monitoring Report

## Observability Strategy
We opted for a native, host-based monitoring setup rather than containerized monitoring. This ensures that even if Docker crashes or the application containers fail, the monitoring system remains independent and online to report the outage.

## Tools Used & Host Ports
* **Grafana** (Port 3000): Installed natively on EC2 via systemd. Connects to Prometheus to visualize metrics.
* **Prometheus** (Port 9090): Installed natively on EC2. The core metrics scraper and time-series database. Configured to scrape data every 15 seconds.
* **Node Exporter** (Port 9100): Installed natively on EC2. Exposes server-level metrics like CPU usage, memory consumption, disk I/O, and network activity.

*(Note: Because Grafana is utilizing host port 3000, the Backend application container is mapped to host port 5000 to avoid conflicts, though internally it still listens on 3000).*

## Architecture Mapping
1. **Grafana Data Source**: When configuring Grafana, the Prometheus Data Source URL should be `http://localhost:9090` (since both run on the same host).
2. **Dashboard**: Import Dashboard ID `1860` for a complete Node Exporter overview.

## Why it matters in DevOps
Continuous Monitoring provides feedback loops. If a new deployment causes a CPU spike or memory leak, the monitoring stack will highlight it immediately, allowing for quick rollbacks or fixes.
