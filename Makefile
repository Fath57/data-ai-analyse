.PHONY: help install dev build start stop clean logs migrate seed studio test lint format

# Default target
.DEFAULT_GOAL := help

# Help command
help:
	@echo "IA Data Insight - NGO Data Analysis Platform"
	@echo ""
	@echo "Available commands:"
	@echo "  make install    - Install all dependencies"
	@echo "  make dev        - Start development environment with Docker"
	@echo "  make dev-local  - Start services locally (without Docker)"
	@echo "  make build      - Build Docker containers"
	@echo "  make start      - Start all services in detached mode"
	@echo "  make stop       - Stop all services"
	@echo "  make restart    - Restart all services"
	@echo "  make clean      - Remove containers and volumes"
	@echo "  make logs       - View logs from all services"
	@echo "  make logs-api   - View backend API logs"
	@echo "  make logs-web   - View frontend logs"
	@echo "  make migrate    - Run database migrations"
	@echo "  make seed       - Seed the database with sample data"
	@echo "  make studio     - Open Prisma Studio"
	@echo "  make test       - Run all tests"
	@echo "  make lint       - Run linters"
	@echo "  make format     - Format code"
	@echo ""

# Install dependencies
install:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Dependencies installed successfully!"

# Development with Docker
dev:
	@echo "Starting development environment..."
	docker-compose up

# Development locally
dev-local:
	@echo "Starting PostgreSQL and Redis..."
	docker-compose up -d postgres redis
	@echo "Waiting for services to be ready..."
	sleep 5
	@echo "Starting backend..."
	cd backend && npm run start:dev &
	@echo "Starting frontend..."
	cd frontend && npm run dev

# Build containers
build:
	@echo "Building Docker containers..."
	docker-compose build

# Start services
start:
	@echo "Starting all services..."
	docker-compose up -d
	@echo "Services started! Frontend: http://localhost:3000, API: http://localhost:4000"

# Stop services
stop:
	@echo "Stopping all services..."
	docker-compose down

# Restart services
restart: stop start

# Clean everything
clean:
	@echo "Removing containers and volumes..."
	docker-compose down -v
	@echo "Cleaned!"

# View logs
logs:
	docker-compose logs -f

logs-api:
	docker-compose logs -f backend

logs-web:
	docker-compose logs -f frontend

# Database migrations
migrate:
	@echo "Running database migrations..."
	cd backend && npx prisma migrate dev

# Seed database
seed:
	@echo "Seeding database..."
	cd backend && npm run prisma:seed

# Open Prisma Studio
studio:
	@echo "Opening Prisma Studio..."
	cd backend && npx prisma studio

# Run tests
test:
	@echo "Running backend tests..."
	cd backend && npm test
	@echo "Running frontend tests..."
	cd frontend && npm test

# Linting
lint:
	@echo "Linting backend..."
	cd backend && npm run lint
	@echo "Linting frontend..."
	cd frontend && npm run lint

# Format code
format:
	@echo "Formatting backend..."
	cd backend && npm run format
	@echo "Formatting frontend..."
	cd frontend && npm run format

# Generate Prisma Client
prisma-generate:
	@echo "Generating Prisma Client..."
	cd backend && npx prisma generate

# Database reset (BE CAREFUL!)
db-reset:
	@echo "⚠️  WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		cd backend && npx prisma migrate reset; \
	fi
