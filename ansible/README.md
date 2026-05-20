# Configuration Management (Ansible)

This directory contains Ansible playbooks to configure the EC2 instances. It ensures idempotency and automates the manual installation of required tools.

## Setup
1. Update `inventory.ini` with your EC2 public IP and the path to your SSH private key.
2. Ensure you have Ansible installed locally (`sudo apt install ansible` or `pip install ansible`).

## Playbooks
* `install-docker.yml`: Installs Docker Engine, Docker Compose, and adds the `ubuntu` user to the `docker` group.
* `install-jenkins.yml`: Installs Java, Jenkins, and adds the `jenkins` user to the `docker` group.
* `install-prometheus.yml`: Installs Prometheus as a systemd service.
* `install-grafana.yml`: Installs Grafana as a systemd service (configured on port 3001).
* `install-node-exporter.yml`: Installs Node Exporter as a systemd service.

## Running Playbooks
Run the playbooks in this order:

```bash
ansible-playbook -i inventory.ini install-docker.yml
ansible-playbook -i inventory.ini install-jenkins.yml
ansible-playbook -i inventory.ini install-prometheus.yml
ansible-playbook -i inventory.ini install-node-exporter.yml
ansible-playbook -i inventory.ini install-grafana.yml
```

**Note**: To disable host key checking temporarily during the lab, you can run:
`ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i inventory.ini <playbook>`
