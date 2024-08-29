-- CreateTable
CREATE TABLE "Users" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rooms" (
    "roomId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Rooms" ("createdAt", "hotelId", "name", "roomId") SELECT "createdAt", "hotelId", "name", "roomId" FROM "Rooms";
DROP TABLE "Rooms";
ALTER TABLE "new_Rooms" RENAME TO "Rooms";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
