import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PortfolioSection } from './portfolio-section.model';
import { PortfolioSectionsService } from './portfolio-sections.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import {
  AddPortfolioSectionInput,
  UpdatePortfolioSectionInput,
  ReorderSectionsInput,
} from './portfolio-section.dto';

@Resolver(() => PortfolioSection)
export class PortfolioSectionsResolver {
  constructor(private portfolioSectionsService: PortfolioSectionsService) {}

  @Query(() => [PortfolioSection])
  async portfolioSections(@Args('portfolioId') portfolioId: string) {
    return this.portfolioSectionsService.findByPortfolioId(portfolioId);
  }

  @Query(() => PortfolioSection, { nullable: true })
  async portfolioSection(@Args('id') id: string) {
    return this.portfolioSectionsService.findById(id);
  }

  @Mutation(() => PortfolioSection)
  @UseGuards(GqlAuthGuard)
  async addPortfolioSection(
    @CurrentUser() user: any,
    @Args('input') input: AddPortfolioSectionInput,
  ) {
    return this.portfolioSectionsService.add(user.userId, input);
  }

  @Mutation(() => PortfolioSection)
  @UseGuards(GqlAuthGuard)
  async updatePortfolioSection(
    @CurrentUser() user: any,
    @Args('input') input: UpdatePortfolioSectionInput,
  ) {
    return this.portfolioSectionsService.update(user.userId, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePortfolioSection(
    @CurrentUser() user: any,
    @Args('id') id: string,
  ) {
    return this.portfolioSectionsService.delete(user.userId, id);
  }

  @Mutation(() => [PortfolioSection])
  @UseGuards(GqlAuthGuard)
  async reorderPortfolioSections(
    @CurrentUser() user: any,
    @Args('input') input: ReorderSectionsInput,
  ) {
    return this.portfolioSectionsService.reorder(
      user.userId,
      input.portfolioId,
      input.sectionIds,
    );
  }

  @Mutation(() => PortfolioSection)
  @UseGuards(GqlAuthGuard)
  async duplicatePortfolioSection(
    @CurrentUser() user: any,
    @Args('id') id: string,
  ) {
    return this.portfolioSectionsService.duplicate(user.userId, id);
  }
}
