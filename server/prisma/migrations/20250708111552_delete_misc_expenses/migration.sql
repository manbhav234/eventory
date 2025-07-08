/*
  Warnings:

  - You are about to drop the `MiscExpenses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MiscExpenses" DROP CONSTRAINT "MiscExpenses_event_fkey";

-- DropTable
DROP TABLE "MiscExpenses";
