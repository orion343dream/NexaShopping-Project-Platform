# NexaShopping Project Platform

A modern **microservices-based e-commerce platform** built with **Spring Cloud** ecosystem. This project demonstrates enterprise-level architecture patterns including service discovery, centralized configuration management, API gateway routing, and reactive programming.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Building the Project](#building-the-project)
- [Running the Services](#running-the-services)
- [Services Documentation](#services-documentation)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🎯 Overview

NexaShopping is a distributed e-commerce platform that showcases best practices for building scalable microservices architectures. The platform consists of three core infrastructure services that work together to provide a robust, resilient, and maintainable system.

### Key Features

- **Service Discovery**: Automatic registration and discovery of services using Eureka
- **Centralized Configuration**: Environment-specific configurations managed from a single location
- **API Gateway**: Single entry point with intelligent routing and load balancing
- **Reactive Processing**: Non-blocking, asynchronous communication patterns
- **Scalability**: Horizontal scaling with automatic service registration
- **Resilience**: Built-in mechanisms for handling failures and maintaining system stability

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Applications                   │
└──────────────────────────┬──────────────────────────────┘
                           │
                    ┌──────▼─────────┐
                    │  API Gateway   │ (Single Entry Point)
                    │ Spring Gateway │
                    │   + WebFlux    │
                    └──────┬─────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
       ┌────▼───┐   ┌──────▼──────┐   ┌──▼───────┐
       │ Service │   │   Config    │   │ Business │
       │Registry │   │   Server    │   │ Services │
       │ Eureka  │   │Spring Config│   │  (Future)│
       └────┬───┘   └──────┬──────┘   └──────────┘
            │              │
            └──────────────┴──────────────────┘
                    Internal Communication
```

### Service Roles

1. **Service Registry (Eureka)**: Central directory for all microservices
2. **Config Server**: Centralized configuration management
3. **API Gateway**: Request routing and forwarding to services

---

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Language** | Java | 25 |
| **Build Tool** | Maven | 3.6+ |
| **Framework** | Spring Boot | Latest Stable |
| **Cloud Platform** | Spring Cloud | Latest Stable |
| **Service Discovery** | Netflix Eureka | - |
| **Configuration** | Spring Cloud Config | - |
| **API Gateway** | Spring Cloud Gateway | - |
| **Reactive** | Project WebFlux | - |
| **Process Manager** | PM2 | - |
| **Database** | (Future Integration) | - |

---

## 📁 Project Structure

```
NexaShopping-Project-Platform/
├── api-gateway/                    # API Gateway Service
│   ├── src/
│   │   ├── main/java/
│   │   │   └── lk/ijse/eca/apigateway/
│   │   │       └── ApiGatewayApplication.java
│   │   └── resources/
│   │       ├── application.yaml
│   │       └── application-dev.yaml
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── README.md
│
├── config-server/                  # Config Server Service
│   ├── src/
│   │   ├── main/java/
│   │   │   └── lk/ijse/eca/configserver/
│   │   │       └── ConfigServerApplication.java
│   │   └── resources/
│   │       └── application.yaml
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── README.md
│
├── service-registry/               # Service Registry (Eureka)
│   ├── src/
│   │   ├── main/java/
│   │   │   └── lk/ijse/eca/serviceregistry/
│   │   │       └── ServiceRegistryApplication.java
│   │   └── resources/
│   │       ├── application.yaml
│   │       └── application-dev.yaml
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── README.md
│
├── pom.xml                         # Root POM (Parent Module)
├── ecosystem.config.js             # PM2 Configuration
├── .github/                        # GitHub Actions Workflows
├── .gitmodules                     # Git Submodules
└── README.md                       # This File
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 25** - JDK 25 or later ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.6+** - Build automation tool
- **Node.js & npm** - For PM2 process management (optional but recommended)
- **Git** - Version control

### Verify Installation

```bash
java -version          # Should show Java 25
mvn -version           # Should show Maven 3.6+
npm -v                 # Optional, for PM2
git --version          # Should show Git version
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/NexaShopping-Project-Platform.git
cd NexaShopping-Project-Platform
```

### 2. Build All Services

```bash
mvn clean install -DskipTests
```

### 3. Run Services (Using Maven)

Open separate terminals for each service:

**Terminal 1 - Config Server:**
```bash
cd config-server
mvn spring-boot:run
```

**Terminal 2 - Service Registry:**
```bash
cd service-registry
mvn spring-boot:run
```

**Terminal 3 - API Gateway:**
```bash
cd api-gateway
mvn spring-boot:run
```

### 4. Verify Services

- **Config Server**: http://localhost:8888
- **Service Registry (Eureka)**: http://localhost:8761
- **API Gateway**: http://localhost:8080

---

## 🔨 Building the Project

### Build All Modules

```bash
# Clean build (recommended)
mvn clean install

# Skip tests for faster build
mvn clean install -DskipTests

# Build specific module
mvn clean install -pl config-server

# Build multiple modules
mvn clean install -pl config-server,service-registry,api-gateway
```

### View Build Info

```bash
# List modules
mvn help:describe

# Show dependency tree
mvn dependency:tree
```

---

## ▶️ Running the Services

### Option 1: Individual Terminals (Development)

Run each service in its own terminal window as shown in Quick Start.

### Option 2: Using PM2 (Production)

First, ensure all services are built:

```bash
mvn clean install -DskipTests
```

Then start with PM2:

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start all services
pm2 start ecosystem.config.js

# View running processes
pm2 list

# View logs
pm2 logs

# Stop all services
pm2 stop all

# Restart all services
pm2 restart all

# Stop and delete all processes
pm2 delete all
```

### Option 3: Docker (Future)

*(To be implemented)*

---

## 📚 Services Documentation

### 1. Config Server
Centralized configuration management for all microservices.

- **Port**: 8888
- **Documentation**: [config-server/README.md](config-server/README.md)
- **Technology**: Spring Cloud Config
- **Key Endpoint**: `GET /config/{service-name}/{profile}`

### 2. Service Registry (Eureka)
Service discovery and registration server.

- **Port**: 8761
- **Dashboard**: http://localhost:8761
- **Documentation**: [service-registry/README.md](service-registry/README.md)
- **Technology**: Netflix Eureka

### 3. API Gateway
Entry point for all client requests with intelligent routing.

- **Port**: 8080
- **Documentation**: [api-gateway/README.md](api-gateway/README.md)
- **Technology**: Spring Cloud Gateway, WebFlux
- **Features**: Route filtering, load balancing, request transformation

---

## ⚙️ Configuration

### Environment-Specific Configuration

Each service supports multiple profiles:

- **default** (`application.yaml`) - Default configuration
- **dev** (`application-dev.yaml`) - Development environment

### Activate Profiles

**Using Maven:**
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

**Using Command Line:**
```bash
java -jar target/service.jar --spring.profiles.active=dev
```

### Configuration Hierarchy

1. Environment Variables (highest priority)
2. Config Server (for registered services)
3. Local YAML files
4. Application defaults (lowest priority)

---

## 👨‍💻 Development

### IDE Setup

#### IntelliJ IDEA
1. Open project root
2. Mark `api-gateway`, `config-server`, `service-registry` as Maven modules
3. Set Project SDK to **Java 25**
4. Enable annotation processing for Lombok (if used)

#### VS Code
1. Install extensions:
   - Extension Pack for Java
   - Spring Boot Extension Pack
   - Maven for Java
2. Set `java.home` to Java 25 installation

### Code Style

- Follow Google Java Style Guide
- Use 4 spaces for indentation
- Add Javadoc for public APIs

### Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=CopyOfTest

# Run with coverage
mvn test jacoco:report
```

---

## 🚢 Deployment

### GCP Deployment

The project includes GitHub Actions workflow for automated deployment to Google Cloud Platform.

- **Workflow**: `.github/workflows/gcp-deployment.yml`
- **Requirements**: GCP credentials configured in GitHub secrets

### Manual Deployment Steps

1. Build application:
   ```bash
   mvn clean install -DskipTests
   ```

2. Create JAR artifacts in respective `target/` directories

3. Deploy using your preferred method:
   - Cloud providers (GCP, AWS, Azure)
   - Container orchestration (Kubernetes)
   - Traditional VMs/Servers

---

## 🔧 Troubleshooting

### Issue: Services Won't Start

**Solution**: Ensure ports are not in use:
```bash
# Check ports (Windows)
netstat -ano | findstr :8888
netstat -ano | findstr :8761
netstat -ano | findstr :8080

# Check ports (macOS/Linux)
lsof -i :8888
lsof -i :8761
lsof -i :8080
```

### Issue: Service Registry Showing "DOWN"

**Solution**: 
- Ensure all services are connected for status checks
- Check network connectivity between services
- Review service health check configuration

### Issue: Config Server Returns 404

**Solution**:
- Verify configuration files exist in the repository
- Check configuration file naming: `{service-name}-{profile}.yaml`
- Ensure Config Server is running before other services

### Issue: Java 25 Not Found

**Solution**:
```bash
# Set JAVA_HOME to Java 25
export JAVA_HOME=/path/to/java-25  # macOS/Linux
set JAVA_HOME=C:\path\to\java-25   # Windows

# Or use Maven with specific Java version
mvn -Dorg.slf4j.simpleLogger.defaultLogLevel=debug ...
```

---

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support

For issues and questions:
- Create an Issue on GitHub
- Review individual service documentation in respective README files
- Check deployment workflows in `.github/workflows/`

---

## 🔗 External Resources

- [Spring Cloud Documentation](https://spring.io/cloud)
- [Spring Boot Reference Guide](https://spring.io/projects/spring-boot)
- [Netflix Eureka](https://github.com/Netflix/eureka)
- [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
- [Project Reactor / WebFlux](https://projectreactor.io/)
- [Java 25 Documentation](https://docs.oracle.com/en/java/javase/25/)

---

## ✨ Acknowledgments

Built using modern Spring Cloud technologies and best practices for distributed systems architecture.

---

**Last Updated**: March 31, 2026

