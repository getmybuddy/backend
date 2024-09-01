/*
  Warnings:

  - You are about to drop the column `personality` on the `friends` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "friends" DROP COLUMN "personality",
ADD COLUMN     "personalities" TEXT[];
