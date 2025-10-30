import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '@/auth/gql-auth.guard';
import { CurrentUser } from '@/auth/current-user.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: any) {
    return this.usersService.findById(user.userId);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @CurrentUser() user: any,
    @Args('data') data: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(user.userId, data);
  }
}
