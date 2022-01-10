/*
  Warnings:

  - The primary key for the `pokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "pokemon" DROP CONSTRAINT "pokemon_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id");
