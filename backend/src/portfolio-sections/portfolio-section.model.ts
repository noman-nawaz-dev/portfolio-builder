import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { SectionType } from '../section-types/section-type.model';

@ObjectType()
export class PortfolioSection {
  @Field(() => ID)
  id: string;

  @Field()
  portfolioId: string;

  @Field()
  sectionTypeId: string;

  @Field(() => SectionType)
  sectionType: SectionType;

  @Field()
  order: number;

  @Field()
  isVisible: boolean;

  @Field(() => GraphQLJSON)
  content: any;

  @Field(() => GraphQLJSON, { nullable: true })
  styles?: any;

  @Field({ nullable: true })
  layout?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  animations?: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
