# Getting Started Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **pnpm** (recommended)
- **Docker** and **Docker Compose**
- **Git**
- **OpenAI API Key** (for AI features)

## Quick Start (Docker)

The fastest way to get started is using Docker Compose:

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd data-ai-analyse

# 2. Copy environment variables
cp .env.example .env

# 3. Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here

# 4. Start all services
docker-compose up -d

# 5. Wait for services to be ready (check logs)
docker-compose logs -f

# 6. Open your browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
# API Docs: http://localhost:4000/api
```

That's it! The application should now be running.

## Local Development Setup

If you prefer to run services locally without Docker:

### 1. Database Setup

Start PostgreSQL and Redis using Docker:

```bash
docker-compose up -d postgres redis
```

Or install them locally on your machine.

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npm run prisma:seed

# Start development server
npm run start:dev
```

The backend API will be available at `http://localhost:4000`

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Environment Variables

### Backend (.env in project root)

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ia_data_insight?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Google OAuth (optional for MVP)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Frontend

The frontend reads from `NEXT_PUBLIC_API_URL` which is set in the root `.env` file.

## Database Management

### View Database with Prisma Studio

```bash
cd backend
npx prisma studio
```

This opens a GUI at `http://localhost:5555` to view and edit your data.

### Create a Migration

```bash
cd backend
npx prisma migrate dev --name <migration-name>
```

### Reset Database

```bash
cd backend
npx prisma migrate reset
```

## Testing

### Backend Tests

```bash
cd backend

# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Check coverage
npm run test:cov
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test
```

## Code Quality

### Linting

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

### Formatting

```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run format
```

## Common Issues & Solutions

### Issue: Port already in use

**Solution**: Change the port in `.env` or stop the conflicting service.

```bash
# Find process using port 4000
lsof -i :4000
# Kill the process
kill -9 <PID>
```

### Issue: Database connection failed

**Solution**: Ensure PostgreSQL is running and credentials are correct.

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres
```

### Issue: Prisma Client not found

**Solution**: Generate the Prisma Client.

```bash
cd backend
npx prisma generate
```

### Issue: OpenAI API errors

**Solution**:
- Check that your API key is valid
- Ensure you have credits in your OpenAI account
- Verify the key is correctly set in `.env`

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code
   - Write tests
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run lint
   npm test
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

## Useful Commands

### Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

### Database

```bash
# Create a new migration
npx prisma migrate dev

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

## Next Steps

Now that your development environment is set up:

1. **Explore the API Documentation**: Visit `http://localhost:4000/api`
2. **Review the Architecture**: See `docs/architecture.md`
3. **Check the Project Structure**: Understand the codebase organization
4. **Start Implementing Features**: Pick a feature from the roadmap

## Getting Help

- **Documentation**: Check the `/docs` folder
- **Issues**: Open an issue on GitHub
- **Architecture Questions**: Review `docs/architecture.md`

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Happy coding! 🚀
