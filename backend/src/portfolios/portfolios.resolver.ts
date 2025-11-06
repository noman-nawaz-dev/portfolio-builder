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

  @Query(() => Portfolio)
  async portfolioByUsername(@Args('username') username: string) {
    return this.portfoliosService.findByUsername(username);
  }

  @Query(() => Portfolio, { nullable: true })
  async publicPortfolioById(@Args('portfolioId') portfolioId: string) {
    return this.portfoliosService.findPublicById(portfolioId);
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
  async updatePortfolio(
    @CurrentUser() user: any,
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('themeId', { nullable: true }) themeId?: string,
    @Args('customDomain', { nullable: true }) customDomain?: string,
    @Args('resumeUrl', { nullable: true }) resumeUrl?: string,
  ) {
    return this.portfoliosService.update(id, user.userId, { name, themeId, customDomain, resumeUrl });
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioResume(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('resumeUrl', { nullable: true }) resumeUrl?: string,
  ) {
    return this.portfoliosService.update(portfolioId, user.userId, { resumeUrl });
  }

  @Mutation(() => Portfolio)
  @UseGuards(GqlAuthGuard)
  async publishPortfolio(
    @CurrentUser() user: any,
    @Args('portfolioId') portfolioId: string,
    @Args('publish') publish: boolean,
  ) {
    return this.portfoliosService.setPublish(portfolioId, user.userId, publish);
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
