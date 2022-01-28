/*
  Warnings:

  - Added the required column `name` to the `Recruit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recruit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Recruit" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Recruit";
DROP TABLE "Recruit";
ALTER TABLE "new_Recruit" RENAME TO "Recruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
