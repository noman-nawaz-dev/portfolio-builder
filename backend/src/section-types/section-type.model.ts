import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

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
  schema: any;

  @Field(() => GraphQLJSON, { nullable: true })
  defaultData?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  styleOptions?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  layoutVariants?: any;

  @Field()
  isActive: boolean;

  @Field()
  isPremium: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
