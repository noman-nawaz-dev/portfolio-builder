import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { Template } from '../templates/template.model';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';

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

  @Field()
  isPublished: boolean;

  @Field()
  name: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  heroData?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  aboutData?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  skillsData?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  projectsData?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  contactData?: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
