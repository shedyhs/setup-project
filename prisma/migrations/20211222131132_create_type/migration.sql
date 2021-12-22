/*
  Warnings:

  - You are about to drop the column `type` on the `pokemon` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
