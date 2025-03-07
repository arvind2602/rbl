/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_uuid" TEXT NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_uuid");

-- CreateTable
CREATE TABLE "erp" (
    "erp_uuid" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_uuid" TEXT NOT NULL,
    "acadmics" JSONB,
    "others" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "erp_pkey" PRIMARY KEY ("erp_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_uuid_key" ON "users"("user_uuid");

-- CreateIndex
CREATE INDEX "users_user_uuid_idx" ON "users"("user_uuid");
