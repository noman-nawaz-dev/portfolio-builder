import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { SectionContent, SectionStyles, AnimationConfig } from '@/common/types';

@InputType()
export class AddPortfolioSectionInput {
  @Field()
  portfolioId: string;

  @Field()
  sectionTypeId: string;

  @Field(() => GraphQLJSON)
  content: SectionContent;

  @Field({ nullable: true })
  layout?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  styles?: SectionStyles;

  @Field(() => GraphQLJSON, { nullable: true })
  animations?: AnimationConfig;

  @Field({ nullable: true })
  order?: number;
}

@InputType()
export class UpdatePortfolioSectionInput {
  @Field()
  id: string;

  @Field(() => GraphQLJSON, { nullable: true })
  content?: SectionContent;

  @Field({ nullable: true })
  layout?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  styles?: SectionStyles;

  @Field(() => GraphQLJSON, { nullable: true })
  animations?: AnimationConfig;

  @Field({ nullable: true })
  isVisible?: boolean;
}

@InputType()
export class ReorderSectionsInput {
  @Field()
  portfolioId: string;

  @Field(() => [String])
  sectionIds: string[];
}
