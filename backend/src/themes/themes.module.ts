import { Module } from '@nestjs/common';
import { ThemesResolver } from './themes.resolver';
import { ThemesService } from './themes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ThemesResolver, ThemesService],
  exports: [ThemesService],
})
export class ThemesModule {}
