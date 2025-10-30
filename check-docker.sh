#!/bin/bash

# Docker PostgreSQL Health Check Script
# Run this to verify your Docker PostgreSQL setup

echo "🐳 Checking Docker PostgreSQL Setup..."
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    echo "   Please install Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo "✅ Docker is installed"

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    exit 1
fi
echo "✅ Docker Compose is available"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running"
    echo "   Please start Docker Desktop"
    exit 1
fi
echo "✅ Docker daemon is running"

# Check if container exists
if ! docker ps -a --format '{{.Names}}' | grep -q "portfolio-builder-db"; then
    echo "⚠️  PostgreSQL container not found"
    echo "   Run: npm run docker:up"
    exit 1
fi
echo "✅ PostgreSQL container exists"

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "portfolio-builder-db"; then
    echo "❌ PostgreSQL container is not running"
    echo "   Run: npm run docker:up"
    exit 1
fi
echo "✅ PostgreSQL container is running"

# Check container health
HEALTH=$(docker inspect --format='{{.State.Health.Status}}' portfolio-builder-db 2>/dev/null)
if [ "$HEALTH" = "healthy" ]; then
    echo "✅ PostgreSQL is healthy"
elif [ "$HEALTH" = "starting" ]; then
    echo "⚠️  PostgreSQL is starting (wait a few seconds)"
else
    echo "⚠️  PostgreSQL health: $HEALTH"
fi

# Test PostgreSQL connection
echo ""
echo "Testing PostgreSQL connection..."
if docker-compose exec -T postgres pg_isready -U portfolio_user -d portfolio_mvp &> /dev/null; then
    echo "✅ PostgreSQL is accepting connections"
else
    echo "❌ Cannot connect to PostgreSQL"
    exit 1
fi

# Check if database exists
echo ""
echo "Checking database..."
DB_EXISTS=$(docker-compose exec -T postgres psql -U portfolio_user -d portfolio_mvp -c "SELECT 1;" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Database 'portfolio_mvp' exists"
else
    echo "❌ Database 'portfolio_mvp' not accessible"
    exit 1
fi

# Check for tables (Prisma schema)
echo ""
echo "Checking database schema..."
TABLES=$(docker-compose exec -T postgres psql -U portfolio_user -d portfolio_mvp -c "\dt" 2>/dev/null | grep -c "public |")
if [ "$TABLES" -gt 0 ]; then
    echo "✅ Found $TABLES tables in database"
    echo ""
    echo "Tables:"
    docker-compose exec -T postgres psql -U portfolio_user -d portfolio_mvp -c "\dt" 2>/dev/null | grep "public |" | awk '{print "   - " $3}'
else
    echo "⚠️  No tables found - run: npm run db:setup"
fi

# Check for template data
echo ""
echo "Checking seed data..."
TEMPLATE_COUNT=$(docker-compose exec -T postgres psql -U portfolio_user -d portfolio_mvp -t -c "SELECT COUNT(*) FROM \"Template\";" 2>/dev/null | tr -d ' ')
if [ "$TEMPLATE_COUNT" -eq 3 ]; then
    echo "✅ Found 3 templates (seed data loaded)"
elif [ "$TEMPLATE_COUNT" -gt 0 ]; then
    echo "⚠️  Found $TEMPLATE_COUNT templates (expected 3)"
else
    echo "⚠️  No templates found - run: npm run prisma:seed"
fi

# Display connection info
echo ""
echo "========================================"
echo "📊 Connection Information:"
echo "========================================"
echo "Host:     localhost"
echo "Port:     5433"
echo "Database: portfolio_mvp"
echo "User:     portfolio_user"
echo "Password: portfolio_password"
echo ""
echo "Connection String:"
echo "postgresql://portfolio_user:portfolio_password@localhost:5433/portfolio_mvp"
echo ""

# Show container info
echo "========================================"
echo "🐳 Container Information:"
echo "========================================"
docker-compose ps

echo ""
echo "========================================"
echo "✅ All checks passed!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Start backend:  cd backend && npm run start:dev"
echo "2. Start frontend: cd frontend && npm run dev"
echo "   OR run both:    npm run dev"
echo ""
echo "Useful commands:"
echo "- View logs:      npm run docker:logs"
echo "- Database GUI:   npm run prisma:studio"
echo "- PostgreSQL CLI: npm run docker:psql"
echo ""
