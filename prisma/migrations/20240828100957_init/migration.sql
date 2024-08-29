/*
  Warnings:

  - The primary key for the `Hotels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Hotels` table. All the data in the column will be lost.
  - The primary key for the `Rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `floor` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Rooms` table. All the data in the column will be lost.
  - The required column `hotelId` was added to the `Hotels` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `hotelId` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - The required column `roomId` was added to the `Rooms` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateTable
CREATE TABLE "RoomCategories" (
    "roomCategoryId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotels" (
    "hotelId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Hotels" ("location", "name", "shortName") SELECT "location", "name", "shortName" FROM "Hotels";
DROP TABLE "Hotels";
ALTER TABLE "new_Hotels" RENAME TO "Hotels";
CREATE TABLE "new_Rooms" (
    "roomId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rooms" ("name") SELECT "name" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
