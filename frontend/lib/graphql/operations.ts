import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $username: String!, $name: String!) {
    register(email: $email, password: $password, username: $username, name: $name) {
      accessToken
      user {
        id
        email
        username
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
        username
        name
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      email
      username
      name
      portfolios {
        id
        name
        isPublished
        template {
          id
          name
          category
        }
        createdAt
      }
    }
  }
`;

export const GET_PORTFOLIO_BY_USERNAME = gql`
  query GetPortfolioByUsername($username: String!) {
    portfolioByUsername(username: $username) {
      id
      title
      slug
      customDomain
      isPublished
      seo {
        title
        description
        keywords
        ogImage
      }
      theme {
        id
        name
        description
        colors
        fonts
        fontSizes
        fontWeights
        lineHeights
        spacing
        borderRadius
        borderWidth
        shadows
        animations
        breakpoints
        customCSS
      }
      sections {
        id
        order
        content
        layout
        styles
        sectionType {
          id
          name
          displayName
          description
          category
        }
      }
      user {
        id
        username
        name
      }
    }
  }
`;

export const GET_MY_PORTFOLIOS = gql`
  query MyPortfolios {
    myPortfolios {
      id
      name
      isPublished
      template {
        id
        name
        category
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PORTFOLIO = gql`
  query GetPortfolio($portfolioId: String!) {
    getPortfolio(portfolioId: $portfolioId) {
      id
      name
      isPublished
      template {
        id
        name
        category
      }
      theme {
        id
        name
        description
        colors
        fonts
        fontSizes
        fontWeights
        lineHeights
        spacing
        borderRadius
        borderWidth
        shadows
        animations
        breakpoints
        customCSS
      }
      sections {
        id
        order
        content
        layout
        styles
        sectionType {
          id
          name
          displayName
          description
          category
          layoutVariants
        }
      }
      user {
        id
        name
        email
        username
      }
      heroData
      aboutData
      skillsData
      projectsData
      contactData
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: UpdateProfileInput!) {
    updateProfile(data: $data) {
      id
      name
      username
      email
    }
  }
`;

export const GET_TEMPLATES = gql`
  query GetTemplates {
    templates {
      id
      name
      category
      description
      previewImage
    }
  }
`;

export const GET_MY_PORTFOLIO = gql`
  query GetMyPortfolio {
    myPortfolio {
      id
      isPublished
      template {
        id
        name
        category
      }
      heroData
      aboutData
      skillsData
      projectsData
      contactData
      updatedAt
      user {
        username
        name
      }
    }
  }
`;

export const GET_PUBLIC_PORTFOLIO = gql`
  query GetPublicPortfolio($username: String!) {
    publicPortfolio(username: $username) {
      id
      template {
        id
        name
        category
      }
      heroData
      aboutData
      skillsData
      projectsData
      contactData
      user {
        username
        name
      }
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio($templateId: String!, $name: String) {
    createPortfolio(templateId: $templateId, name: $name) {
      id
      name
      template {
        id
        name
        category
      }
    }
  }
`;

export const UPDATE_PORTFOLIO_HERO = gql`
  mutation UpdatePortfolioHero($portfolioId: String!, $data: JSONObject!) {
    updatePortfolioHero(portfolioId: $portfolioId, data: $data) {
      id
      heroData
      updatedAt
    }
  }
`;

export const UPDATE_PORTFOLIO_ABOUT = gql`
  mutation UpdatePortfolioAbout($portfolioId: String!, $data: JSONObject!) {
    updatePortfolioAbout(portfolioId: $portfolioId, data: $data) {
      id
      aboutData
      updatedAt
    }
  }
`;

export const UPDATE_PORTFOLIO_SKILLS = gql`
  mutation UpdatePortfolioSkills($portfolioId: String!, $data: JSON!) {
    updatePortfolioSkills(portfolioId: $portfolioId, data: $data) {
      id
      skillsData
      updatedAt
    }
  }
`;

export const UPDATE_PORTFOLIO_PROJECTS = gql`
  mutation UpdatePortfolioProjects($portfolioId: String!, $data: JSON!) {
    updatePortfolioProjects(portfolioId: $portfolioId, data: $data) {
      id
      projectsData
      updatedAt
    }
  }
`;

export const UPDATE_PORTFOLIO_CONTACT = gql`
  mutation UpdatePortfolioContact($portfolioId: String!, $data: JSONObject!) {
    updatePortfolioContact(portfolioId: $portfolioId, data: $data) {
      id
      contactData
      updatedAt
    }
  }
`;

export const UPDATE_PORTFOLIO_NAME = gql`
  mutation UpdatePortfolioName($portfolioId: String!, $name: String!) {
    updatePortfolioName(portfolioId: $portfolioId, name: $name) {
      id
      name
      updatedAt
    }
  }
`;

export const TOGGLE_PUBLISH = gql`
  mutation TogglePublish($portfolioId: String!) {
    togglePublish(portfolioId: $portfolioId) {
      id
      isPublished
    }
  }
`;

export const CHANGE_TEMPLATE = gql`
  mutation ChangeTemplate($portfolioId: String!, $templateId: String!) {
    changeTemplate(portfolioId: $portfolioId, templateId: $templateId) {
      id
      template {
        id
        name
        category
      }
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($portfolioId: String!) {
    deletePortfolio(portfolioId: $portfolioId)
  }
`;

// ============================================
// SECTION TYPES
// ============================================

export const GET_SECTION_TYPES = gql`
  query GetSectionTypes($category: String) {
    sectionTypes(category: $category) {
      id
      name
      displayName
      description
      icon
      category
      componentName
      schema
      defaultData
      styleOptions
      layoutVariants
      isActive
      isPremium
    }
  }
`;

export const GET_SECTION_CATEGORIES = gql`
  query GetSectionCategories {
    sectionCategories
  }
`;

// ============================================
// THEMES
// ============================================

export const GET_THEMES = gql`
  query GetThemes($includePrivate: Boolean) {
    themes(includePrivate: $includePrivate) {
      id
      name
      description
      category
      colors
      fonts
      fontSizes
      fontWeights
      lineHeights
      spacing
      borderRadius
      borderWidth
      shadows
      animations
      breakpoints
      customCSS
      isDefault
      isPublic
      isPremium
      usageCount
    }
  }
`;

export const GET_DEFAULT_THEME = gql`
  query GetDefaultTheme {
    defaultTheme {
      id
      name
      description
      colors
      fonts
      fontSizes
      fontWeights
      lineHeights
      spacing
      borderRadius
      borderWidth
      shadows
      animations
      breakpoints
      customCSS
    }
  }
`;

export const GET_MY_THEMES = gql`
  query GetMyThemes {
    myThemes {
      id
      name
      description
      colors
      fonts
      fontSizes
      fontWeights
      lineHeights
      spacing
      borderRadius
      borderWidth
      shadows
      animations
      breakpoints
      customCSS
      isDefault
      isPublic
      isPremium
    }
  }
`;

// ============================================
// PORTFOLIO SECTIONS
// ============================================

export const GET_PORTFOLIO_SECTIONS = gql`
  query GetPortfolioSections($portfolioId: String!) {
    portfolioSections(portfolioId: $portfolioId) {
      id
      portfolioId
      order
      isVisible
      content
      styles
      layout
      animations
      sectionType {
        id
        name
        displayName
        componentName
        category
        layoutVariants
        styleOptions
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_PORTFOLIO_SECTION = gql`
  mutation AddPortfolioSection($input: AddPortfolioSectionInput!) {
    addPortfolioSection(input: $input) {
      id
      portfolioId
      order
      isVisible
      content
      styles
      layout
      animations
      sectionType {
        id
        name
        displayName
        componentName
      }
    }
  }
`;

export const UPDATE_PORTFOLIO_SECTION = gql`
  mutation UpdatePortfolioSection($input: UpdatePortfolioSectionInput!) {
    updatePortfolioSection(input: $input) {
      id
      content
      styles
      layout
      animations
      isVisible
      sectionType {
        id
        name
        displayName
      }
    }
  }
`;

export const DELETE_PORTFOLIO_SECTION = gql`
  mutation DeletePortfolioSection($id: String!) {
    deletePortfolioSection(id: $id)
  }
`;

export const REORDER_PORTFOLIO_SECTIONS = gql`
  mutation ReorderPortfolioSections($input: ReorderSectionsInput!) {
    reorderPortfolioSections(input: $input) {
      id
      order
      sectionType {
        displayName
      }
    }
  }
`;

export const DUPLICATE_PORTFOLIO_SECTION = gql`
  mutation DuplicatePortfolioSection($id: String!) {
    duplicatePortfolioSection(id: $id) {
      id
      portfolioId
      order
      content
      styles
      layout
      animations
      sectionType {
        id
        name
        displayName
      }
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: String!, $name: String, $themeId: String, $customDomain: String) {
    updatePortfolio(id: $id, name: $name, themeId: $themeId, customDomain: $customDomain) {
      id
      name
      theme {
        id
        name
        description
        colors
        fonts
        fontSizes
        fontWeights
        lineHeights
        spacing
        borderRadius
        borderWidth
        shadows
        animations
        breakpoints
        customCSS
      }
      customDomain
      updatedAt
    }
  }
`;

export const PUBLISH_PORTFOLIO = gql`
  mutation PublishPortfolio($portfolioId: String!, $publish: Boolean!) {
    publishPortfolio(portfolioId: $portfolioId, publish: $publish) {
      id
      isPublished
      updatedAt
    }
  }
`;
