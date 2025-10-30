import { Resolver, Query, Args } from '@nestjs/graphql';
import { Template } from './template.model';
import { TemplatesService } from './templates.service';

@Resolver(() => Template)
export class TemplatesResolver {
  constructor(private templatesService: TemplatesService) {}

  @Query(() => [Template])
  async templates() {
    return this.templatesService.findAll();
  }

  @Query(() => Template, { nullable: true })
  async template(@Args('id') id: string) {
    return this.templatesService.findById(id);
  }
}
