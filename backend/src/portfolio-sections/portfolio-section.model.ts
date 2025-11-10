import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { SectionType } from '../section-types/section-type.model';
import { SectionContent, SectionStyles, AnimationConfig } from '@/common/types';

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
  content: SectionContent;

  @Field(() => GraphQLJSON, { nullable: true })
  styles?: SectionStyles;

  @Field({ nullable: true })
  layout?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  animations?: AnimationConfig;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
