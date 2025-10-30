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
