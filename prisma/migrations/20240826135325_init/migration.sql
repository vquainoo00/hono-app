/*
  Warnings:

  - Added the required column `shortName` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Hotel" ("id", "location", "name") SELECT "id", "location", "name" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
