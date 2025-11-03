import { Resolver, Query, Args } from '@nestjs/graphql';
import { SectionType } from './section-type.model';
import { SectionTypesService } from './section-types.service';

@Resolver(() => SectionType)
export class SectionTypesResolver {
  constructor(private sectionTypesService: SectionTypesService) {}

  @Query(() => [SectionType])
  async sectionTypes(
    @Args('category', { nullable: true }) category?: string,
  ) {
    return this.sectionTypesService.findAll(category);
  }

  @Query(() => SectionType, { nullable: true })
  async sectionType(@Args('id') id: string) {
    return this.sectionTypesService.findById(id);
  }

  @Query(() => [SectionType])
  async sectionTypesByCategory(@Args('category') category: string) {
    return this.sectionTypesService.findByCategory(category);
  }

  @Query(() => [String])
  async sectionCategories() {
    return this.sectionTypesService.getCategories();
  }
}
