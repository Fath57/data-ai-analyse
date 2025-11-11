# IA Data Insight - Platform for NGOs

> An intelligent data analysis platform designed specifically for NGOs to extract insights from their data without technical expertise.

## Project Overview

**IA Data Insight** helps NGOs analyze their data (donations, impact metrics, budgets) using natural language queries. Built with modern technologies and AI-powered insights.

### Target Audience
- Non-profit organizations
- Social impact organizations
- Humanitarian associations
- Development agencies

### Key Features (MVP)
- CSV/Excel data import (up to 50MB)
- AI-powered natural language queries
- Pre-configured analysis templates for NGOs (budget tracking, donor analysis, impact metrics)
- Interactive visualizations (charts, tables, maps)
- PDF/Excel report export
- Secure authentication
- Project management and history

## Tech Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis
- **AI**: OpenAI API (GPT-4)
- **Auth**: JWT + Passport
- **Validation**: class-validator

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: Shadcn/ui + Tailwind CSS
- **Charts**: Recharts + Apache ECharts
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana (future)

## Project Structure

```
.
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── users/             # User management
│   │   ├── projects/          # Project/workspace management
│   │   ├── data/              # Data import & processing
│   │   ├── ai-agent/          # AI query processing
│   │   ├── common/            # Shared utilities
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── test/
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities & helpers
│   │   └── styles/            # Global styles
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docs/                       # Documentation
│   ├── architecture.md
│   └── api-reference.md
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- pnpm (recommended) or npm

### Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd data-ai-analyse
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file with:
   - Database credentials
   - OpenAI API key
   - JWT secret
   - etc.

### Running with Docker (Recommended)

```bash
# Start all services (backend, frontend, PostgreSQL, Redis)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Documentation: http://localhost:4000/api

### Running Locally (Development)

#### Backend
```bash
cd backend
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm start:dev
```

#### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

## Development Workflow

### Database Migrations
```bash
cd backend
pnpm prisma migrate dev --name <migration-name>
pnpm prisma studio  # Open database GUI
```

### Testing
```bash
# Backend tests
cd backend
pnpm test
pnpm test:e2e

# Frontend tests
cd frontend
pnpm test
```

### Code Quality
```bash
# Linting
pnpm lint

# Format code
pnpm format
```

## MVP Roadmap (3 months)

### Month 1: Foundations
- [x] Project setup & architecture
- [ ] Authentication (Google OAuth + Email)
- [ ] User profile management
- [ ] CSV import (basic)
- [ ] Data preview

### Month 2: Core Features
- [ ] AI agent integration (OpenAI)
- [ ] Template queries for NGOs
- [ ] Chart generation (5 types)
- [ ] Project management
- [ ] Data persistence

### Month 3: Polish & Launch
- [ ] PDF/Excel export
- [ ] Sharing functionality
- [ ] Performance optimization
- [ ] User testing
- [ ] Landing page

## NGO-Specific Features

### Pre-configured Templates
1. **Donor Analysis**: Track donations by source, frequency, amount
2. **Budget Tracking**: Monitor expenses vs. budget by category
3. **Impact Metrics**: Visualize beneficiaries reached, projects completed
4. **Geographic Distribution**: Map data visualization
5. **Trend Analysis**: Year-over-year comparisons

### Data Privacy
- All data encrypted at rest and in transit
- GDPR compliant
- Optional on-premise deployment for sensitive data
- No data shared with third parties

## API Documentation

Once the backend is running, visit http://localhost:4000/api for interactive Swagger documentation.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add some feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [Project Issues](https://github.com/your-org/data-ai-analyse/issues)
- Email: support@yourproject.com

## Acknowledgments

Built with support for the social impact sector.
Dedicated to helping NGOs make data-driven decisions.

---

**Status**: 🚧 In Development (MVP Phase)
**Version**: 0.1.0
**Last Updated**: November 2024
