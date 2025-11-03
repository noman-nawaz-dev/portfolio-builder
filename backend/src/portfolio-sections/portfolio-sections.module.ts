import { Module } from '@nestjs/common';
import { PortfolioSectionsResolver } from './portfolio-sections.resolver';
import { PortfolioSectionsService } from './portfolio-sections.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PortfolioSectionsResolver, PortfolioSectionsService],
  exports: [PortfolioSectionsService],
})
export class PortfolioSectionsModule {}
