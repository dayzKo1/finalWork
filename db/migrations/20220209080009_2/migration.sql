/*
  Warnings:

  - Added the required column `description` to the `Recurit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recurit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "salary" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Recurit" ("createdAt", "id", "salary", "updatedAt") SELECT "createdAt", "id", "salary", "updatedAt" FROM "Recurit";
DROP TABLE "Recurit";
ALTER TABLE "new_Recurit" RENAME TO "Recurit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
