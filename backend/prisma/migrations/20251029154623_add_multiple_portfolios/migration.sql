-- DropIndex
DROP INDEX "Portfolio_userId_key";

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'My Portfolio';

-- CreateIndex
CREATE INDEX "Portfolio_userId_idx" ON "Portfolio"("userId");
