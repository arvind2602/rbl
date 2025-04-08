/*
  Warnings:

  - You are about to drop the column `acadmics` on the `erp` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `erp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "erp" DROP COLUMN "acadmics",
DROP COLUMN "others",
ADD COLUMN     "enrollment_info" JSONB,
ADD COLUMN     "financial_info" JSONB,
ADD COLUMN     "personal_info" JSONB;
