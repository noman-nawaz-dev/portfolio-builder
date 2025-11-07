# GitHub Copilot Instructions for Portfolio Builder

This file contains comprehensive guidelines and best practices that GitHub Copilot should follow when working on the Portfolio Builder project. These instructions ensure consistency, scalability, reusability, and maintainability across the codebase.

---

## 🎯 Project Overview

Portfolio Builder is a full-stack application built with:
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Apollo Client
- **Backend**: NestJS, GraphQL, Prisma, PostgreSQL
- **Architecture**: Monorepo structure with separate frontend and backend folders

---

## 📋 Core Principles

### 1. Component Reusability
**Always use existing UI components instead of creating new HTML elements.**

✅ **DO:**
```typescript
import { Heading, Text, Button, Stack } from '@/components/ui';

<Stack spacing="md">
  <Heading as="h1" size="3xl">Welcome</Heading>
  <Text>This is a paragraph</Text>
  <Button variant="primary">Click me</Button>
</Stack>
```

❌ **DON'T:**
```typescript
<div className="space-y-4">
  <h1 className="text-3xl font-bold">Welcome</h1>
  <p className="text-gray-600">This is a paragraph</p>
  <button className="px-4 py-2 bg-blue-600 text-white">Click me</button>
</div>
```

### 2. Consistency Over Customization
**Use design system tokens and predefined component variants.**

✅ **DO:**
```typescript
<Button variant="primary" size="lg">Save</Button>
<Alert variant="success">Saved successfully!</Alert>
```

❌ **DON'T:**
```typescript
<button className="px-8 py-4 bg-green-500 text-white rounded-lg">Save</button>
<div className="bg-green-100 text-green-800 p-4">Saved successfully!</div>
```

### 3. Type Safety
**Always use TypeScript with proper types. Never use `any` unless absolutely necessary.**

✅ **DO:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const handleUser = (user: User) => {
  console.log(user.name);
};
```

❌ **DON'T:**
```typescript
const handleUser = (user: any) => {
  console.log(user.name);
};
```

---

## 🎨 Frontend Guidelines

### UI Components Hierarchy

**Use the following component library (in order of preference):**

1. **Layout Components**: `Container`, `Stack`, `Flex`, `Grid`, `Box`
2. **Typography Components**: `Heading`, `Text`, `Link`
3. **Form Components**: `Button`, `Input`, `Textarea`, `Select`
4. **Feedback Components**: `Alert`, `Modal`, `Badge`, `Loading`
5. **Data Display**: `Card`, `CardHeader`, `CardBody`
6. **Utility Components**: `Icon`, `Divider`
7. **Page Components**: `PageContainer`, `PageHeader`, `Section`, `SectionHeader`

### Component Usage Examples

#### Typography
```typescript
// Headings - Always use semantic HTML with the 'as' prop
<Heading as="h1" size="5xl" gradient>Main Title</Heading>
<Heading as="h2" size="3xl" weight="bold">Section Title</Heading>
<Heading as="h3" size="xl">Subsection</Heading>

// Text
<Text variant="body" size="lg">Body text</Text>
<Text variant="caption">Small caption</Text>
<Text variant="error">Error message</Text>

// Links
<Link href="/about" variant="nav">About</Link>
<Link href="https://example.com" external>External Link</Link>
```

#### Layout
```typescript
// Stack - for vertical or horizontal spacing
<Stack direction="vertical" spacing="lg" align="center">
  <Heading>Title</Heading>
  <Text>Description</Text>
</Stack>

// Flex - for flexible layouts
<Flex justify="between" align="center" gap="md">
  <Text>Left content</Text>
  <Button>Right button</Button>
</Flex>

// Grid - for responsive grids
<Grid cols={1} mdCols={2} lgCols={3} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Container - for max-width and centering
<Container maxWidth="4xl" padding="lg">
  Content here
</Container>
```

#### Forms
```typescript
<Stack spacing="md">
  <Input
    type="email"
    label="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    helperText="We'll never share your email"
  />
  
  <Select
    label="Country"
    options={countries}
    value={selectedCountry}
    onChange={setSelectedCountry}
  />
  
  <Button type="submit" variant="primary" size="lg" fullWidth>
    Submit
  </Button>
</Stack>
```

### File Organization

**Frontend Structure:**
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (route)/           
│   │   └── page.tsx       # Page component
│   └── layout.tsx         # Layout wrapper
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── index.ts       # Barrel exports
│   ├── layout/            # Layout-specific components
│   └── [feature]/         # Feature-specific components
├── lib/
│   ├── graphql/          # GraphQL queries/mutations
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
└── styles/               # Global styles
```

**Naming Conventions:**
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: kebab-case for utilities (e.g., `api-client.ts`)
- **Folders**: kebab-case (e.g., `user-profile/`)
- **Variables/Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_USERS`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `UserProfile`)

### State Management

**Use built-in React hooks and context:**

```typescript
// ✅ For local state
const [isOpen, setIsOpen] = useState(false);

// ✅ For shared state
const { user, setUser } = useAuth();

// ✅ For server state
const { data, loading, error } = useQuery(GET_USER);
const [updateUser] = useMutation(UPDATE_USER);
```

### Error Handling

**Always handle errors gracefully:**

```typescript
const { data, loading, error } = useQuery(GET_DATA);

if (loading) return <LoadingScreen />;
if (error) return <Alert variant="error">{error.message}</Alert>;
if (!data) return <EmptyState />;

return <DataDisplay data={data} />;
```

### Accessibility

**Ensure all components are accessible:**

```typescript
// ✅ Use semantic HTML
<Heading as="h1">Title</Heading>  // Not <div className="text-3xl">

// ✅ Add ARIA labels where needed
<Button aria-label="Close modal">×</Button>

// ✅ Use form labels
<Input label="Email" type="email" required />

// ✅ Handle keyboard navigation
<Button onClick={handleClick} onKeyDown={handleKeyDown}>
```

---

## 🔧 Backend Guidelines

### File Organization

**Backend Structure:**
```
backend/
├── src/
│   ├── [feature]/
│   │   ├── [feature].module.ts
│   │   ├── [feature].resolver.ts
│   │   ├── [feature].service.ts
│   │   ├── [feature].model.ts
│   │   └── [feature].dto.ts
│   ├── common/           # Shared utilities
│   ├── prisma/           # Prisma service
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── test/
```

### Module Structure

**Follow NestJS patterns:**

```typescript
// ✅ Module
@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

// ✅ Service
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

// ✅ Resolver
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
```

### GraphQL Schema

**Use code-first approach with decorators:**

```typescript
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [Portfolio])
  portfolios: Portfolio[];
}
```

### Database Access

**Always use Prisma service:**

```typescript
// ✅ DO
async createUser(data: CreateUserInput): Promise<User> {
  return this.prisma.user.create({ data });
}

// ❌ DON'T write raw SQL unless absolutely necessary
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

**Use Tailwind utility classes, but extract common patterns to components:**

```typescript
// ✅ DO - Use component props for variations
<Button variant="primary" size="lg" />

// ❌ DON'T - Repeat Tailwind classes
<button className="px-8 py-4 bg-indigo-600 text-white rounded-xl">
```

**Responsive Design:**
```typescript
// ✅ Use responsive props on components
<Grid cols={1} smCols={2} lgCols={3} />
<Heading size="3xl" className="sm:text-4xl lg:text-5xl" />

// ✅ Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
```

### Design Tokens

**Use the design system:**
- **Colors**: `indigo-600`, `purple-600`, `gray-600`
- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **Typography**: Defined in Heading and Text components
- **Shadows**: Defined in Card and other components
- **Border Radius**: `rounded-xl`, `rounded-2xl`

---

## 🚀 Performance Optimization

### Frontend

```typescript
// ✅ Use dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'));

// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => calculateValue(data), [data]);

