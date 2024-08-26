/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Hotel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Hotel" ("id", "location", "name") SELECT "id", "location", "name" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
