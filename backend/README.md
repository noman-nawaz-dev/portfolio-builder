# Portfolio Builder - Backend

NestJS GraphQL API for Portfolio Builder application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure `.env`:
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_mvp"
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="7d"
   PORT=4000
   ```

3. Setup database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. Start server:
   ```bash
   npm run start:dev
   ```

## API Endpoints

GraphQL API: `http://localhost:4000/graphql`

## GraphQL Schema

### Mutations

#### Authentication
- `register(email, password, username, name)` - Create new account
- `login(email, password)` - Authenticate user

#### Portfolio Management
- `createPortfolio(templateId)` - Create portfolio with template
- `updatePortfolioHero(data)` - Update hero section
- `updatePortfolioAbout(data)` - Update about section
- `updatePortfolioSkills(data)` - Update skills section
- `updatePortfolioProjects(data)` - Update projects section
- `updatePortfolioContact(data)` - Update contact section
- `togglePublish()` - Publish/unpublish portfolio
- `changeTemplate(templateId)` - Change portfolio template

### Queries
- `me` - Get authenticated user
- `templates` - Get all templates
- `template(id)` - Get single template
- `myPortfolio` - Get user's portfolio (auth required)
- `publicPortfolio(username)` - Get public portfolio

## Project Structure

```
src/
├── auth/              # Authentication & JWT
├── users/             # User management
├── portfolios/        # Portfolio CRUD
├── templates/         # Template queries
├── prisma/            # Database service
├── common/            # Scalars & utilities
├── app.module.ts      # Main module
└── main.ts            # Entry point
```

## Development

```bash
npm run start:dev      # Development with hot reload
npm run prisma:studio  # Database GUI
npm run lint           # Lint code
```
