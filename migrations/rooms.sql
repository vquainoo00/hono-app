-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rooms" (
    "roomId" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT,
    "branchId" TEXT,
    "hotelId" TEXT,
    "floor" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rooms" ("createdAt", "hotelId", "roomId") SELECT "createdAt", "hotelId", "roomId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
