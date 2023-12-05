/*
  Warnings:

  - Changed the type of `contractor` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "contractor",
ADD COLUMN     "contractor" JSONB NOT NULL;
