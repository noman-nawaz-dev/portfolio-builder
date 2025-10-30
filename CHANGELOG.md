# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial monorepo setup with npm workspaces
- Frontend workspace with Next.js, TypeScript, and Tailwind CSS
- Backend workspace with NestJS, GraphQL, and Prisma
- Docker Compose configuration for PostgreSQL
- CI/CD pipeline with GitHub Actions
- Dependabot configuration for automated dependency updates
- Contributing guidelines and code of conduct
- Issue and PR templates
- EditorConfig for consistent coding styles

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [1.0.0] - 2025-10-30

### Added
- Initial release of Portfolio Builder
- User authentication and authorization
- Portfolio creation and management
- Template system with multiple portfolio styles
- Image upload functionality
- GraphQL API
- Responsive frontend design

---

## How to Update This Changelog

### Categories

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities

### Version Format

- Version numbers follow [Semantic Versioning](https://semver.org/)
- MAJOR.MINOR.PATCH (e.g., 1.0.0)
  - MAJOR: Breaking changes
  - MINOR: New features (backwards compatible)
  - PATCH: Bug fixes (backwards compatible)

### Entry Format

```markdown
## [Version] - YYYY-MM-DD

### Category
- Brief description of the change
- Reference issue numbers when applicable (#123)
- Credit contributors when appropriate (@username)
```

### Example Entry

```markdown
## [1.1.0] - 2025-11-15

### Added
- User profile customization feature (#45)
- Dark mode support (#67)

### Changed
- Improved performance of portfolio rendering (#89)

### Fixed
- Fixed authentication redirect issue (#91)
- Resolved image upload timeout (#103)

### Security
- Updated dependencies to patch security vulnerabilities
```
