/*
  Warnings:

  - Made the column `title` on table `ChatSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ChatSession` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT 'new chat';
