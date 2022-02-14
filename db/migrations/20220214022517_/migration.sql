/*
  Warnings:

  - The primary key for the `Apply` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "recruitId" INTEGER,
    CONSTRAINT "Apply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Apply_recruitId_fkey" FOREIGN KEY ("recruitId") REFERENCES "Recruit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Apply" ("createdAt", "recruitId", "updatedAt", "userId") SELECT "createdAt", "recruitId", "updatedAt", "userId" FROM "Apply";
DROP TABLE "Apply";
ALTER TABLE "new_Apply" RENAME TO "Apply";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
