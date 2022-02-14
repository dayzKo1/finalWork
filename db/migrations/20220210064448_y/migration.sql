/*
  Warnings:

  - Added the required column `description` to the `Recruit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recruit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "salary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Recruit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recruit" ("createdAt", "id", "name", "salary", "updatedAt", "userId") SELECT "createdAt", "id", "name", "salary", "updatedAt", "userId" FROM "Recruit";
DROP TABLE "Recruit";
ALTER TABLE "new_Recruit" RENAME TO "Recruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
