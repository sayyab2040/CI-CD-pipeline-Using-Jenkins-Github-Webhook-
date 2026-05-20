resource "aws_instance" "app_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = {
    Name        = "SecureLogin-CICD-Server"
    Environment = "Dev"
    Project     = "DevOps-Lab"
  }

  root_block_device {
    volume_size = 30 # Need sufficient space for Docker images and Jenkins
    volume_type = "gp3"
  }
}
