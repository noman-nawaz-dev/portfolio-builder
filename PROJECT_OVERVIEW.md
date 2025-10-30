# Portfolio Builder MVP - Project Overview

## 📋 Project Information

**Project Name:** Portfolio Builder MVP  
**Version:** 1.0.0  
**Type:** Full-Stack Web Application  
**Purpose:** Create professional portfolio websites with pre-built templates

---

## 🏗️ Architecture

### Backend
- **Framework:** NestJS (Node.js + TypeScript)
- **API:** GraphQL with Apollo Server (Code First approach)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt

### Frontend
- **Framework:** Next.js 14+ (React with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Apollo Client (GraphQL)
- **Routing:** App Router (built-in Next.js)

---

## 📊 Database Schema

### Tables

#### Users
```
id          UUID (PK)
email       String (UNIQUE)
password    String (hashed)
username    String (UNIQUE)
name        String
createdAt   DateTime
updatedAt   DateTime
```

#### Portfolios
```
id           UUID (PK)
userId       UUID (FK -> Users, UNIQUE)
templateId   UUID (FK -> Templates)
isPublished  Boolean (default: false)
heroData     JSON (nullable)
aboutData    JSON (nullable)
skillsData   JSON (nullable)
projectsData JSON (nullable)
contactData  JSON (nullable)
createdAt    DateTime
updatedAt    DateTime
```

#### Templates
```
id           UUID (PK)
name         String
category     String (engineer/marketer/general)
description  String
previewImage String (URL)
createdAt    DateTime
```

### Relationships
- User → Portfolio (One-to-One)
- Template → Portfolio (One-to-Many)

---

## 🎯 Core Features

### ✅ Implemented in MVP

1. **Authentication**
   - Email/password registration
   - Email/password login
   - JWT-based sessions
   - Password hashing with bcrypt

2. **Templates**
   - 3 pre-built templates (seeded in database)
   - Software Engineer template
   - Marketing Professional template
   - General Professional template

3. **Portfolio Management**
   - One portfolio per user
   - Template selection on first use
   - Form-based editor (5 sections)
   - Publish/Unpublish toggle
   - Template switching

4. **Portfolio Sections**
   - Hero (name, tagline, photo URL)
   - About (bio text)
   - Skills/Services (list)
   - Projects/Case Studies (max 3)
   - Contact (email, phone, LinkedIn, GitHub)

5. **Public Portfolios**
   - Published portfolios at /{username}
   - Responsive design
   - Template-specific styling

6. **User Dashboard**
   - Portfolio status
   - Edit portfolio button
   - Publish toggle
   - Portfolio URL (when published)

---

## 🚫 NOT Included in MVP (Future Features)

- Drag-and-drop editor
- Custom domains
- Multiple portfolios per user
- Theme/color customization
- File uploads (using URLs only in MVP)
- OAuth login (Google, GitHub)
- Email verification
- Password reset functionality
- Admin dashboard
- Subscription/Payment system
- Analytics/View tracking
- SEO settings
- Dark mode
- Version history
- Auto-save (manual save on form submit)
- Rich text editor (plain textarea)

---

## 🌐 API Structure

### GraphQL Endpoint
`http://localhost:4000/graphql`

### Mutations
**Auth:**
- `register(email, password, username, name)`
- `login(email, password)`

**Portfolio:**
- `createPortfolio(templateId)`
- `updatePortfolioHero(data)`
- `updatePortfolioAbout(data)`
- `updatePortfolioSkills(data)`
- `updatePortfolioProjects(data)`
- `updatePortfolioContact(data)`
- `togglePublish()`
- `changeTemplate(templateId)`

### Queries
- `me` - Get authenticated user
- `templates` - Get all templates
- `template(id)` - Get single template
- `myPortfolio` - Get user's portfolio (auth required)
- `publicPortfolio(username)` - Get published portfolio

---

## 🛣️ Frontend Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing page | No |
| `/register` | Sign up | No |
| `/login` | Sign in | No |
| `/dashboard` | User dashboard | Yes |
| `/templates` | Template selection | Yes |
| `/editor` | Portfolio editor | Yes |
| `/[username]` | Public portfolio | No |

---

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT authentication with expiration
- Protected GraphQL mutations with guards
- CORS configuration
- Environment variable protection
- SQL injection prevention (via Prisma)
- XSS protection (React's built-in escaping)

---

## 📦 Project Files Structure

```
portfolio-builder/
├── README.md                 # Main documentation
├── QUICKSTART.md            # Quick start guide
├── PROJECT_OVERVIEW.md      # This file
├── .gitignore               # Git ignore rules
│
├── backend/
│   ├── src/
│   │   ├── auth/           # JWT auth, guards, strategies
│   │   ├── users/          # User CRUD operations
│   │   ├── portfolios/     # Portfolio CRUD operations
│   │   ├── templates/      # Template queries
│   │   ├── prisma/         # Prisma service
│   │   ├── common/         # Scalars (JSON, DateTime)
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seed data (templates)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                # Environment variables
│   └── README.md
│
└── frontend/
    ├── app/
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Landing page
    │   ├── login/page.tsx       # Login page
    │   ├── register/page.tsx    # Register page
    │   ├── dashboard/page.tsx   # Dashboard
    │   ├── templates/page.tsx   # Template selection
    │   ├── editor/page.tsx      # Portfolio editor
    │   ├── [username]/page.tsx  # Public portfolio
    │   └── globals.css          # Global styles
    ├── components/
    │   └── portfolio/
    │       ├── EngineerTemplate.tsx
    │       ├── MarketerTemplate.tsx
    │       └── GeneralTemplate.tsx
    ├── lib/
    │   ├── apollo-client.tsx        # Apollo setup
    │   ├── auth.ts                  # Auth helpers
    │   └── graphql/
    │       └── operations.ts        # GraphQL queries/mutations
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── .env.local
    └── README.md
```

---

## 🧪 Testing the Application

### Manual Testing Checklist

**Authentication:**
- [ ] Register new user
- [ ] Login with credentials
- [ ] Invalid login shows error
- [ ] JWT persists in localStorage
- [ ] Logout clears token

**Template Selection:**
- [ ] All 3 templates display
- [ ] Can select a template
- [ ] Redirects to editor after selection
- [ ] Can't access if already has portfolio

**Portfolio Editor:**
- [ ] All 5 tabs work
- [ ] Can save each section
- [ ] Data persists after save
- [ ] Forms validate required fields

**Publishing:**
- [ ] Can publish from dashboard
- [ ] Published portfolios are accessible
- [ ] Unpublished portfolios show 404
- [ ] Toggle works correctly

**Public Portfolio:**
- [ ] Displays correct template
- [ ] Shows all saved data
- [ ] Links work correctly
- [ ] Responsive on mobile

---

## 🚀 Deployment Considerations

### Backend
- Use production PostgreSQL (Heroku Postgres, AWS RDS)
- Set strong JWT_SECRET
- Enable HTTPS
- Configure CORS for production domain
- Add rate limiting
- Set up logging

### Frontend
- Update NEXT_PUBLIC_GRAPHQL_URL to production
- Deploy to Vercel (recommended for Next.js)
- Set up custom domain
- Enable analytics

---

## 📈 Future Enhancements

### Phase 2
- Multiple portfolios per user
- Custom color themes
- File upload for images
- Drag-and-drop editor

### Phase 3
- OAuth authentication
- Custom domains
- Analytics dashboard
- SEO optimization
- Email notifications

### Phase 4
- Subscription tiers
- Premium templates
- AI-powered content suggestions
- Team collaboration

---

## 👨‍💻 Developer Notes

### Code Style
- TypeScript strict mode
- ESLint for code quality
- Prettier for formatting
- Conventional commit messages

### Performance
- GraphQL query optimization
- Image lazy loading
- Code splitting (Next.js automatic)
- Database indexing on frequently queried fields

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatible

---

## 📞 Support & Contact

For questions, issues, or contributions:
1. Check documentation in README.md
2. Review QUICKSTART.md for setup issues
3. Create GitHub issue with details
4. Include error messages and logs

---

**Last Updated:** October 2025  
**Status:** MVP Complete ✅
