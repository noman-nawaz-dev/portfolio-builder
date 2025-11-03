import { Module } from '@nestjs/common';
import { SectionTypesResolver } from './section-types.resolver';
import { SectionTypesService } from './section-types.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SectionTypesResolver, SectionTypesService],
  exports: [SectionTypesService],
})
export class SectionTypesModule {}
