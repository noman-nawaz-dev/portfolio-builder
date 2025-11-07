```mermaid
erDiagram

    USER {
        String id PK
        String email
        String password
        String username
        String name
        String avatar
        String subscription
        DateTime createdAt
        DateTime updatedAt
    }

    PORTFOLIO {
        String id PK
        String userId FK
        String templateId FK
        String themeId FK
        String name
        String slug
        Boolean isPublished
        String resumeUrl
        String metaTitle
        String metaDescription
        String metaImage
        String favicon
        Json globalSettings
        String customCSS
        String customJS
        Int viewCount
        String analyticsId
        DateTime createdAt
        DateTime updatedAt
    }

    TEMPLATE {
        String id PK
        String name
        String category
        String description
        String previewImage
        String thumbnailImage
        String demoUrl
        String defaultThemeId FK
        Json config
        Boolean isActive
        Boolean isPremium
        String author
        String version
        String[] tags
        DateTime createdAt
        DateTime updatedAt
    }

    SECTIONTYPE {
        String id PK
        String name
        String displayName
        String description
        String icon
        String category
        String componentName
        Json schema
        Json defaultData
        Json styleOptions
        Json layoutVariants
        Boolean isActive
        Boolean isPremium
        DateTime createdAt
        DateTime updatedAt
    }

    PORTFOLIOSECTION {
        String id PK
        String portfolioId FK
        String sectionTypeId FK
        Int order
        Boolean isVisible
        Json content
        Json styles
        String layout
        Json animations
        DateTime createdAt
        DateTime updatedAt
    }

    THEME {
        String id PK
        String name
        String description
        Json colors
        Json fonts
        Json fontSizes
        Json fontWeights
        Json lineHeights
        Json spacing
        Json borderRadius
        Json borderWidth
        Json shadows
        Json animations
        Json breakpoints
        String customCSS
        String category
        Boolean isDefault
        Boolean isPublic
        Boolean isPremium
        Int usageCount
        DateTime createdAt
        DateTime updatedAt
    }

    PORTFOLIOVIEW {
        String id PK
        String portfolioId FK
        String ipAddress
        String userAgent
        String country
        String city
        String device
        String browser
        String referrer
        DateTime viewedAt
    }

    %% Relationships
    USER ||--o{ PORTFOLIO : "has many"
    PORTFOLIO }o--|| TEMPLATE : "uses"
    PORTFOLIO }o--o| THEME : "applies"
    PORTFOLIO ||--o{ PORTFOLIOSECTION : "contains"
    SECTIONTYPE ||--o{ PORTFOLIOSECTION : "used by"
    TEMPLATE }o--o| THEME : "default theme"
    PORTFOLIO ||--o{ PORTFOLIOVIEW : "tracked by"
