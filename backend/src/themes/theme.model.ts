import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Theme {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field(() => GraphQLJSON)
  colors: any;

  @Field(() => GraphQLJSON)
  fonts: any;

  @Field(() => GraphQLJSON)
  fontSizes: any;

  @Field(() => GraphQLJSON)
  fontWeights: any;

  @Field(() => GraphQLJSON)
  lineHeights: any;

  @Field(() => GraphQLJSON)
  spacing: any;

  @Field(() => GraphQLJSON)
  borderRadius: any;

  @Field(() => GraphQLJSON)
  borderWidth: any;

  @Field(() => GraphQLJSON)
  shadows: any;

  @Field(() => GraphQLJSON)
  animations: any;

  @Field(() => GraphQLJSON)
  breakpoints: any;

  @Field({ nullable: true })
  customCSS?: string;

  @Field()
  category: string;

  @Field()
  isDefault: boolean;

  @Field()
  isPublic: boolean;

  @Field()
  isPremium: boolean;

  @Field()
  usageCount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
