-- AlterTable
ALTER TABLE "RoomCategories" ADD COLUMN "currency" TEXT;
ALTER TABLE "RoomCategories" ADD COLUMN "price" REAL;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotels" (
    "hotelId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "headOfficeLocation" TEXT,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Hotels" ("contactEmail", "contactPhone", "createdAt", "description", "headOfficeLocation", "hotelId", "name") SELECT "contactEmail", "contactPhone", "createdAt", "description", "headOfficeLocation", "hotelId", "name" FROM "Hotels";
DROP TABLE "Hotels";
ALTER TABLE "new_Hotels" RENAME TO "Hotels";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
