# Quick Start - 5 Minutes Setup

## Prerequisites
- Docker & Docker Compose installed
- OpenAI API key

## Steps

### 1. Clone & Setup
```bash
git clone <your-repo>
cd data-ai-analyse
```

### 2. Configure Environment
```bash
# Edit .env file and add your OpenAI API key
OPENAI_API_KEY=sk-your-key-here
```

### 3. Start Everything
```bash
make start
# Or: docker-compose up -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api
- **Database GUI**: `make studio` (http://localhost:5555)

### 5. Seed Database (Optional)
```bash
# Wait 30 seconds for database to be ready, then:
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npm run prisma:seed
```

## Useful Commands

```bash
make help          # See all available commands
make logs          # View all logs
make logs-api      # View backend logs only
make stop          # Stop all services
make clean         # Remove everything
```

## What's Next?

1. **Explore the API**: http://localhost:4000/api
2. **Read the docs**: Check `/docs` folder
3. **Start coding**: See `docs/GETTING_STARTED.md`

## Troubleshooting

**Port conflict?**
```bash
# Edit .env and change:
BACKEND_PORT=4001  # Or any free port
```

**Database issues?**
```bash
make clean  # Remove everything and start fresh
make start
```

**Need help?**
- Check `docs/GETTING_STARTED.md` for detailed setup
- Review `docs/architecture.md` for technical details

---

That's it! You should now have the full stack running. 🚀
