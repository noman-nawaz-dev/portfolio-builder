import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class AddPortfolioSectionInput {
  @Field()
  portfolioId: string;

  @Field()
  sectionTypeId: string;

  @Field(() => GraphQLJSON)
  content: any;

  @Field({ nullable: true })
  layout?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  styles?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  animations?: any;

  @Field({ nullable: true })
  order?: number;
}

@InputType()
export class UpdatePortfolioSectionInput {
  @Field()
  id: string;

  @Field(() => GraphQLJSON, { nullable: true })
  content?: any;

  @Field({ nullable: true })
  layout?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  styles?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  animations?: any;

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
