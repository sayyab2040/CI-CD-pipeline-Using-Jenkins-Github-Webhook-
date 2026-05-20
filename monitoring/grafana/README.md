# Grafana Visualization

Grafana is installed directly on the EC2 instance as a `systemd` service via Ansible. To avoid conflict with our Node.js backend, Grafana is configured to run on port `3001`.

## Initial Setup
1. Access Grafana at `http://<EC2-PUBLIC-IP>:3001`
2. Default login is `admin` / `admin`. You will be prompted to change the password.
3. Go to **Connections > Data Sources**.
4. Add a new **Prometheus** data source.
5. Set the URL to `http://localhost:9090` (Since Grafana and Prometheus are on the same machine).
6. Click **Save & Test**.

## Dashboards
To get started with server monitoring:
1. Go to **Dashboards > Import**.
2. Enter ID `1860` (Node Exporter Full dashboard).
3. Select your Prometheus data source and click **Import**.
