import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Portfolio } from '../portfolios/portfolio.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field(() => [Portfolio])
  portfolios: Portfolio[];

  @Field()
  createdAt: Date;
}
