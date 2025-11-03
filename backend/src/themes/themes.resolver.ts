import { Resolver, Query, Args } from '@nestjs/graphql';
import { Theme } from './theme.model';
import { ThemesService } from './themes.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Theme)
export class ThemesResolver {
  constructor(private themesService: ThemesService) {}

  @Query(() => [Theme])
  async themes(
    @Args('includePrivate', { nullable: true, defaultValue: false })
    includePrivate?: boolean,
  ) {
    return this.themesService.findAll(includePrivate);
  }

  @Query(() => [Theme])
  @UseGuards(GqlAuthGuard)
  async myThemes(@CurrentUser() user: any) {
    return this.themesService.findByUserId(user.userId);
  }

  @Query(() => Theme, { nullable: true })
  async theme(@Args('id') id: string) {
    return this.themesService.findById(id);
  }

  @Query(() => Theme, { nullable: true })
  async defaultTheme() {
    return this.themesService.findDefaultTheme();
  }
}
