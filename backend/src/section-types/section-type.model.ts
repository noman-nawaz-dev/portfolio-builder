import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  SectionTypeSchema,
  SectionTypeDefaultData,
  SectionTypeStyleOptions,
  SectionTypeLayoutVariants,
} from '@/common/types';

@ObjectType()
export class SectionType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  category: string;

  @Field()
  componentName: string;

  @Field(() => GraphQLJSON)
  schema: SectionTypeSchema;

  @Field(() => GraphQLJSON, { nullable: true })
  defaultData?: SectionTypeDefaultData;

  @Field(() => GraphQLJSON, { nullable: true })
  styleOptions?: SectionTypeStyleOptions;

  @Field(() => GraphQLJSON, { nullable: true })
  layoutVariants?: SectionTypeLayoutVariants;

  @Field()
  isActive: boolean;

  @Field()
  isPremium: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
