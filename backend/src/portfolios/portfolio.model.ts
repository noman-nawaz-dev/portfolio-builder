import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { Template } from '../templates/template.model';
import { Theme } from '../themes/theme.model';
import { PortfolioSection } from '../portfolio-sections/portfolio-section.model';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';
import { PortfolioSEO, PortfolioGlobalSettings } from '@/common/types';

@ObjectType()
export class Portfolio {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;

  @Field(() => Template)
  template: Template;

  @Field(() => Theme, { nullable: true })
  theme?: Theme;

  @Field({ nullable: true })
  themeId?: string;

  @Field(() => [PortfolioSection], { nullable: true })
  sections?: PortfolioSection[];

  @Field()
  isPublished: boolean;

  @Field()
  name: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  customDomain?: string;

  @Field({ nullable: true })
  resumeUrl?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  seo?: PortfolioSEO;

  @Field(() => GraphQLJSONObject, { nullable: true })
  globalSettings?: PortfolioGlobalSettings;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
