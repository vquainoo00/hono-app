-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "hotel";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Hotels" ("id", "location", "name", "shortName") SELECT "id", "location", "name", "shortName" FROM "Hotels";
DROP TABLE "Hotels";
ALTER TABLE "new_Hotels" RENAME TO "Hotels";
CREATE TABLE "new_Rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rooms" ("floor", "id", "name") SELECT "floor", "id", "name" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
