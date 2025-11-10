import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '@/auth/gql-auth.guard';
import { CurrentUser } from '@/auth/current-user.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';
import { AuthenticatedUser } from '@/common/types';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.findById(user.userId);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Args('data') data: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(user.userId, data);
  }
}
