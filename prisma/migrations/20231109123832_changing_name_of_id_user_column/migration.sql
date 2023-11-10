/*
  Warnings:

  - You are about to drop the column `userId` on the `properties` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "userId",
ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
