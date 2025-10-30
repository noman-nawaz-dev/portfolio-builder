import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.model';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
