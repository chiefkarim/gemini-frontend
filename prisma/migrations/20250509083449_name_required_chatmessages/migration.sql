/*
  Warnings:

  - Made the column `name` on table `ChatMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ChatMessage` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'Karim';
