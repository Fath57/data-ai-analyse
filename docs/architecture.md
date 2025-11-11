# IA Data Insight - Architecture Documentation

## Overview

IA Data Insight is a full-stack web application designed to help NGOs analyze their data using AI-powered natural language queries. The platform allows users to upload datasets, ask questions in plain language, and receive visualizations and insights.

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│              (Next.js 14 + React)               │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Dashboard│  │ Projects │  │ AI Query │     │
│  │  Page    │  │   Page   │  │   Page   │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                  │
│  Components: Shadcn/ui + Tailwind CSS          │
│  State: Zustand                                │
│  Charts: Recharts + ECharts                    │
└─────────────┬───────────────────────────────────┘
              │ HTTP/REST
              │
┌─────────────▼───────────────────────────────────┐
│              Backend API Gateway                │
│                 (NestJS)                         │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │   Auth   │  │ Projects │  │ Data Mgmt│     │
│  │  Module  │  │  Module  │  │  Module  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                  │
│  ┌──────────┐  ┌──────────┐                    │
│  │   AI     │  │  Users   │                    │
│  │  Agent   │  │  Module  │                    │
│  └────┬─────┘  └──────────┘                    │
└───────┼────────────┬────────────────────────────┘
        │            │
        │            │
   ┌────▼────┐  ┌───▼─────┐
   │ OpenAI  │  │PostgreSQL│
   │   API   │  │   DB     │
   └─────────┘  └──────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Charts**: Recharts, Apache ECharts
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT + Passport (Google OAuth)
- **File Upload**: Multer
- **Data Processing**: csv-parse, xlsx
- **AI Integration**: OpenAI API

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL
- **Cache**: Redis
- **File Storage**: Local (development) / S3 (production)

## Database Schema

### Core Entities

**User**
- Authentication (email/password + OAuth)
- Profile information
- Organization details

**Project**
- Workspace for organizing datasets
- Sharing capabilities
- User ownership

**Dataset**
- Uploaded CSV/Excel files
- Schema metadata
- Processing status

**Query**
- Natural language questions
- AI-generated SQL
- Results and visualizations
- Execution history

**Template**
- Pre-configured NGO-specific queries
- Reusable analysis patterns

## API Endpoints

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
GET    /api/v1/auth/google
GET    /api/v1/auth/google/callback
```

### Users
```
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
DELETE /api/v1/users/account
```

### Projects
```
GET    /api/v1/projects
GET    /api/v1/projects/:id
POST   /api/v1/projects
PUT    /api/v1/projects/:id
DELETE /api/v1/projects/:id
POST   /api/v1/projects/:id/share
```

### Data Management
```
POST   /api/v1/data/upload/:projectId
GET    /api/v1/data/datasets/:projectId
GET    /api/v1/data/dataset/:id
GET    /api/v1/data/dataset/:id/preview
DELETE /api/v1/data/dataset/:id
POST   /api/v1/data/dataset/:id/export
```

### AI Agent
```
POST   /api/v1/ai/query
GET    /api/v1/ai/templates
POST   /api/v1/ai/template/:templateId
GET    /api/v1/ai/queries/:projectId
POST   /api/v1/ai/export/:queryId
```

## AI Query Processing Flow

1. **User Input**: Natural language question
2. **Context Building**: Fetch dataset schema
3. **AI Processing**: Send to OpenAI with schema context
4. **Query Generation**: Generate SQL or Pandas query
5. **Validation**: Validate query for safety
6. **Execution**: Run query on dataset
7. **Visualization**: Determine best chart type
8. **Response**: Return results + chart config
9. **Storage**: Save query for history

## Security Measures

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests/minute)
- File type and size validation
- SQL injection prevention
- CORS configuration
- Environment variable management
- HTTPS in production

## NGO-Specific Features

### Pre-configured Templates

1. **Donor Analysis**
   - Track donations by source
   - Analyze donor frequency
   - Identify major donors

2. **Budget Tracking**
   - Monitor expenses vs budget
   - Category-wise spending
   - Variance analysis

3. **Impact Metrics**
   - Beneficiaries reached
   - Projects completed
   - Geographic coverage

4. **Fundraising Analytics**
   - Campaign performance
   - Conversion rates
   - Revenue trends

5. **Trend Analysis**
   - Year-over-year comparisons
   - Seasonal patterns
   - Growth metrics

## Data Flow

### Upload Flow
```
User → Frontend → Backend API → Multer → File Storage
                               → CSV Parser → Schema Extraction
                               → Database (metadata)
```

### Query Flow
```
User Question → Frontend → Backend AI Agent
                        → OpenAI API (with schema)
                        → Query Generator
                        → Query Executor
                        → Chart Config Generator
                        → Frontend (visualization)
```

## Deployment

### Development
```bash
docker-compose up
```

### Production Considerations
- Separate database instances
- S3 for file storage
- Load balancing
- SSL certificates
- Environment-specific configs
- Monitoring & logging
- Automated backups

## Performance Optimization

- Database indexing on frequently queried fields
- Redis caching for templates and schemas
- Lazy loading for large datasets
- Pagination for query results
- Query execution timeout (30s max)
- File size limits (50MB in MVP)

## Future Enhancements

- Real-time collaboration
- Advanced ML predictions
- Custom dashboard widgets
- API integrations (Salesforce, QuickBooks)
- White-label solutions
- Mobile applications
- Automated reporting

## Development Workflow

1. Create feature branch
2. Implement changes
3. Write tests
4. Run linter & formatter
5. Create pull request
6. Code review
7. Merge to main
8. Deploy

## Monitoring & Logging

- Application logs (Winston)
- Error tracking (Sentry - future)
- Performance monitoring (future)
- User analytics (future)

---

**Last Updated**: November 2024
**Version**: 0.1.0
