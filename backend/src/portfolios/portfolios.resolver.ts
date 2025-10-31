import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';
import { Portfolio } from './portfolio.model';
import { PortfoliosService } from './portfolios.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(private portfoliosService: PortfoliosService) {}

  @Query(() => [Portfolio])
  @UseGuards(GqlAuthGuard)
  async myPortfolios(@CurrentUser() user: any) {
    return this.portfoliosService.findAllByUserId(user.userId);
  }

  @Query(() => Portfolio, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async myPortfolio(@CurrentUser() user: any) {
    return this.portfoliosService.findByUserId(user.userId);
  }

  @Query(() => Portfolio, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPortfolio(@CurrentUser() user: any, @Args('portfolioId') portfolioId: string) {
    const portfolio = await this.portfoliosService.findById(portfolioId);
    if (!portfolio || portfolio.userId !== user.userId) {
      return null;
    }
    return portfolio;
  }

  @Query(() => Portfolio)
  async publicPortfolio(@Args('username') username: string) {
    return this.portfoliosService.findByUsername(username);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async createPortfolio(
    @CurrentUser() user: any,
    @Args('templateId') templateId: string,
    @Args('name', { nullable: true }) name?: string,
  ) {
    return this.portfoliosService.create(user.userId, templateId, name);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioHero(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('data', { type: () => GraphQLJSONObject }) data: any,
  ) {
    return this.portfoliosService.updateHeroData(portfolioId, user.userId, data);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioAbout(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('data', { type: () => GraphQLJSONObject }) data: any,
  ) {
    return this.portfoliosService.updateAboutData(portfolioId, user.userId, data);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioSkills(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('data', { type: () => GraphQLJSON }) data: any,
  ) {
    return this.portfoliosService.updateSkillsData(portfolioId, user.userId, data);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioProjects(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('data', { type: () => GraphQLJSON }) data: any,
  ) {
    return this.portfoliosService.updateProjectsData(portfolioId, user.userId, data);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioContact(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('data', { type: () => GraphQLJSONObject }) data: any,
  ) {
    return this.portfoliosService.updateContactData(portfolioId, user.userId, data);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioName(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('name') name: string,
  ) {
    return this.portfoliosService.updateName(portfolioId, user.userId, name);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async togglePublish(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
  ) {
    return this.portfoliosService.togglePublish(portfolioId, user.userId);
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async changeTemplate(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('templateId') templateId: string,
  ) {
    return this.portfoliosService.changeTemplate(portfolioId, user.userId, templateId);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePortfolio(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
  ) {
    return this.portfoliosService.delete(portfolioId, user.userId);
  }
}
