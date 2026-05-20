# Configuration Management: Ansible Report

## Purpose
Ansible automates the configuration of the EC2 server, replacing manual SSH sessions and bash commands. It ensures the server state is exactly as defined (idempotency).

## Playbook Breakdown
1. **Docker (`install-docker.yml`)**: Adds Docker repository, installs Docker CE and Docker Compose plugin, and configures user permissions so `sudo` isn't required for Docker commands.
2. **Jenkins (`install-jenkins.yml`)**: Installs Java JRE, adds Jenkins repository, installs Jenkins, and crucially, adds the `jenkins` user to the `docker` group so the CI pipeline can build images.
3. **Monitoring**:
   * `install-prometheus.yml`: Downloads binaries, creates dedicated users/directories, and sets up a `systemd` service for continuous background execution.
   * `install-node-exporter.yml`: Sets up the metrics exporter as a service.
   * `install-grafana.yml`: Installs Grafana via APT and modifies its default port to 3001 to avoid conflicts.

By using Ansible, an entire environment can be rebuilt reliably in minutes.
