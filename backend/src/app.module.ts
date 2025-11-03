import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { UploadModule } from './upload/upload.module';
import { SectionTypesModule } from './section-types/section-types.module';
import { ThemesModule } from './themes/themes.module';
import { PortfolioSectionsModule } from './portfolio-sections/portfolio-sections.module';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: { JSON: GraphQLJSON, JSONObject: GraphQLJSONObject },
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TemplatesModule,
    PortfoliosModule,
    UploadModule,
    SectionTypesModule,
    ThemesModule,
    PortfolioSectionsModule,
  ],
  providers: [],
})
export class AppModule {}
