-- CreateTable
CREATE TABLE "Bookings" (
    "bookingId" TEXT NOT NULL PRIMARY KEY,
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
