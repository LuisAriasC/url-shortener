# 🧩 URL Shortener - Nx Monorepo

Proyecto de acortador de URLs desarrollado en un monorepo Nx con frontend en **React**, backend en **NestJS**, y base de datos en **PostgreSQL**. Todo el entorno está dockerizado para facilitar el desarrollo, pruebas y despliegue.

---

## 🐳 Levantar el proyecto con Docker Compose

### 1. Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Configura las variables de entorno

Copia los archivos de ejemplo a sus versiones activas:

```bash
cp apps/backend/docker-compose.env.example apps/backend/docker-compose.env
cp apps/frontend/docker-compose.env.example apps/frontend/docker-compose.env
```

Edit these files as needed (e.g., credentials, ports, app URLs).

3. Start all services

To spin up the full stack, run:

```bash
docker compose up --build url-shortener-db
```

```bash
docker compose up --build url-shortener-backend
```

```bash
docker compose up --build url-shortener-frontend
```

This will launch the services in order:
	1.	🗄 PostgreSQL Database
Service: url-shortener-db
Port: 5432
	2.	⚙️ NestJS Backend API
Service: url-shortener-backend
Port: 3000
URL: http://localhost:3000
	3.	🎨 React Frontend
Service: url-shortener-frontend
Port: 4200
URL: http://localhost:4200

📁 Project Structure
```bash
.
├── apps/
│   ├── backend/        # NestJS backend
│   └── frontend/       # React frontend
│
├── libs/               # Shared libraries (types, components, services, etc.)
│
├── docker-compose.yml  # Main service orchestrator
└── README.md
```

🔧 Useful Commands

View logs in real-time
```bash
docker compose logs -f
```

Stop and remove all services
```bash
docker compose down
```

Rebuild containers (after code changes)
```bash
docker compose up --build
```

💡 Local Development (without Docker)

If you prefer to run the services locally without Docker:
	1.	Make sure PostgreSQL is running on your machine.
	2.	Start the backend:

```bash
npx nx serve url-shortener-backend
```

3.	In another terminal, start the frontend:
```bash
npx nx serve url-shortener-frontend
```