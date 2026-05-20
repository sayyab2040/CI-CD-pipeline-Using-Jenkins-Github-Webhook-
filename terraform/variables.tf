variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.medium" # Minimum recommended for Jenkins + Docker
}

variable "ami_id" {
  description = "Ubuntu 22.04 LTS AMI ID for the selected region"
  type        = string
  default     = "ami-0c7217cdde317cfec" # Note: Change this to the latest Ubuntu AMI in your region
}

variable "key_name" {
  description = "Name of the existing SSH key pair in AWS"
  type        = string
  default     = "my-aws-key" # Note: Update this with your actual key pair name
}
