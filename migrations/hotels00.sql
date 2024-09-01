-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotels" (
    "hotelId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "headOfficeLocation" TEXT NOT NULL,
    "contactPhone" TEXT NULL,
    "contactEmail" TEXT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Hotels" ("createdAt", "hotelId", "name", "description", "headOfficeLocation") SELECT "createdAt", "hotelId", "name", "name", "location" FROM "Hotels";
DROP TABLE "Hotels";
ALTER TABLE "new_Hotels" RENAME TO "Hotels";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
