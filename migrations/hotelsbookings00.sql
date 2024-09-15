-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bookings" (
    "bookingId" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "guestContact" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Bookings" ("bookingId", "branchId", "checkInDate", "checkOutDate", "createdAt", "currency", "guestContact", "guestName", "price", "roomId", "staffId", "status", "updatedAt") SELECT "bookingId", "branchId", "checkInDate", "checkOutDate", "createdAt", "currency", "guestContact", "guestName", "price", "roomId", "staffId", "status", "updatedAt" FROM "Bookings";
DROP TABLE "Bookings";
ALTER TABLE "new_Bookings" RENAME TO "Bookings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
