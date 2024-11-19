/*
  Warnings:

  - Added the required column `jobType` to the `Pack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLevel` to the `Pack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetLevel` to the `Pack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pack` ADD COLUMN `jobType` VARCHAR(191) NOT NULL,
    ADD COLUMN `startLevel` INTEGER NOT NULL,
    ADD COLUMN `targetLevel` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `JobActivity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `itemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `xpGained` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobActivity` ADD CONSTRAINT `JobActivity_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
