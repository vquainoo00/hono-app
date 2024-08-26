/*
  Warnings:

  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Hotel";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Hotels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
