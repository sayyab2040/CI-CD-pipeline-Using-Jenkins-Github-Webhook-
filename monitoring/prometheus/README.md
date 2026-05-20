# Prometheus Monitoring

Prometheus is installed directly on the EC2 instance as a `systemd` service via Ansible, rather than running in a container.

## Configuration
The `prometheus.yml` file here is meant to be copied to `/etc/prometheus/prometheus.yml` on the server.
By default, it is configured to scrape:
1. Itself (`localhost:9090`)
2. Node Exporter (`localhost:9100`)

## Manual Application
If you need to apply this configuration manually:
```bash
sudo cp prometheus.yml /etc/prometheus/
sudo systemctl restart prometheus
```

## Access
Once installed, access Prometheus at `http://<EC2-PUBLIC-IP>:9090`
