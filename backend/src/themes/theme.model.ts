import { ObjectType, Field, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  ThemeColors,
  ThemeFonts,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeLineHeights,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeBorderWidth,
  ThemeShadows,
  ThemeAnimations,
  ThemeBreakpoints,
} from '@/common/types';

@ObjectType()
export class Theme {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSON)
  colors: ThemeColors;

  @Field(() => GraphQLJSON)
  fonts: ThemeFonts;

  @Field(() => GraphQLJSON)
  fontSizes: ThemeFontSizes;

  @Field(() => GraphQLJSON)
  fontWeights: ThemeFontWeights;

  @Field(() => GraphQLJSON)
  lineHeights: ThemeLineHeights;

  @Field(() => GraphQLJSON)
  spacing: ThemeSpacing;

  @Field(() => GraphQLJSON)
  borderRadius: ThemeBorderRadius;

  @Field(() => GraphQLJSON)
  borderWidth: ThemeBorderWidth;

  @Field(() => GraphQLJSON)
  shadows: ThemeShadows;

  @Field(() => GraphQLJSON)
  animations: ThemeAnimations;

  @Field(() => GraphQLJSON)
  breakpoints: ThemeBreakpoints;

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
