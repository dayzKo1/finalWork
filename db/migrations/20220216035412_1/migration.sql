-- CreateTable
CREATE TABLE "Collect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "recruitId" INTEGER,
    CONSTRAINT "Collect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Collect_recruitId_fkey" FOREIGN KEY ("recruitId") REFERENCES "Recruit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
