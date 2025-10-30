import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { Template } from '../templates/template.model';
import { GraphQLJSONObject } from 'graphql-type-json';
import { JSONScalar } from '../common/scalars/json.scalar';

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

  @Field(() => JSONScalar, { nullable: true })
  skillsData?: any;

  @Field(() => JSONScalar, { nullable: true })
  projectsData?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  contactData?: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
