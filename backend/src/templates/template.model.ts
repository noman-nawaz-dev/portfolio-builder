import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Template {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  description: string;

  @Field()
  previewImage: string;

  @Field()
  createdAt: Date;
}
