import { Resolver, Query, Args } from '@nestjs/graphql';
import { Theme } from './theme.model';
import { ThemesService } from './themes.service';

@Resolver(() => Theme)
export class ThemesResolver {
  constructor(private themesService: ThemesService) {}

  @Query(() => [Theme])
  async themes() {
    return this.themesService.findAll();
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
