# Student Management Microservice

A simple RESTful microservice built with Node.js and Express, designed to run on multiple VirtualBox VMs for distributed computing demonstration.

## Overview

This project demonstrates:
- Virtual machine creation and configuration using VirtualBox
- Network connectivity between multiple VMs
- Deployment of a microservice-based application
- Client-server communication over a virtual network

## Architecture

The system uses a client-server architecture with:
- **Backend VM**: Hosts the Node.js microservice (Student Management API)
- **Client VM**: Consumes the service using HTTP requests

## Prerequisites

- VirtualBox installed on host machine
- Ubuntu Server 24.04 LTS ISO file
- Internet connection for package installation

## Installation Steps

### 1. Create Virtual Machines

Create two VMs in VirtualBox:

**Backend VM:**
- Name: Backend-VM
- Type: Linux
- Version: Ubuntu (64-bit)
- Memory: 2048 MB
- CPU: 2 Cores
- Storage: 20 GB (VDI, dynamically allocated)

**Client VM:**
- Name: Client-VM
- Type: Linux
- Version: Ubuntu (64-bit)
- Memory: 1024 MB
- CPU: 1 Core
- Storage: 10 GB (VDI, dynamically allocated)

### 2. Network Configuration

For both VMs:
- Go to Settings → Network → Adapter 1
- Attached to: Host-Only Adapter
- This allows VMs to communicate with each other

### 3. Install Ubuntu Server

1. Attach Ubuntu Server ISO to each VM
2. Start the VM and follow installation prompts
3. Create a user account
4. Install OpenSSH server when prompted

### 4. Verify Network Connectivity

On each VM, check IP address:
```bash
ip a
```

Note down the IP addresses (e.g., 192.168.56.101 for Backend, 192.168.56.102 for Client)

Test connectivity from Client VM:
```bash
ping <Backend-VM-IP>
```

### 5. Install Node.js on Backend VM

Update system packages:
```bash
sudo apt update
sudo apt upgrade -y
```

Install Node.js and npm:
```bash
sudo apt install -y nodejs npm
```

Verify installation:
```bash
node -v
npm -v
```

### 6. Deploy the Microservice

Create project directory:
```bash
mkdir student-microservice
cd student-microservice
```

Copy the project files (server.js and package.json) to this directory.

Install dependencies:
```bash
npm install
```

Start the service:
```bash
node server.js
```

## API Endpoints

The microservice provides the following endpoints:

### 1. Welcome Message
```
GET /
```
Returns service information and available endpoints.

### 2. Health Check
```
GET /health
```
Returns service status and uptime.

### 3. System Information
```
GET /system
```
Returns VM system information (hostname, CPU, memory, etc.).

### 4. Get All Students
```
GET /students
```
Returns a list of all students.

### 5. Get Student by ID
```
GET /students/:id
```
Returns information for a specific student.

## Testing from Client VM

Install curl on Client VM:
```bash
sudo apt install -y curl
```

Test the endpoints (replace IP with your Backend VM IP):

```bash
# Welcome message
curl http://192.168.56.101:3000/

# Health check
curl http://192.168.56.101:3000/health

# System info
curl http://192.168.56.101:3000/system

# All students
curl http://192.168.56.101:3000/students

# Specific student
curl http://192.168.56.101:3000/students/1
```

## Sample Response

**GET /students**
```json
{
  "total": 4,
  "students": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "course": "Computer Science",
      "year": 2
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "course": "Information Technology",
      "year": 3
    }
  ],
  "timestamp": "2026-02-05T10:30:00.000Z"
}
```

## Troubleshooting

**Service not accessible:**
- Check if service is running: `ps aux | grep node`
- Verify firewall settings: `sudo ufw status`
- Check IP addresses are correct: `ip a`

**Connection refused:**
- Ensure backend service is listening on 0.0.0.0 (all interfaces)
- Verify port 3000 is not blocked

## License

ISC
