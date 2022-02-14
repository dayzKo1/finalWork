/*
  Warnings:

  - You are about to drop the `Recurit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Recruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Recruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Recruit` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Recurit";
PRAGMA foreign_keys=on;

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
    "detail" TEXT NOT NULL,
    CONSTRAINT "Recruit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recruit" ("createdAt", "id", "name", "updatedAt", "userId") SELECT "createdAt", "id", "name", "updatedAt", "userId" FROM "Recruit";
DROP TABLE "Recruit";
ALTER TABLE "new_Recruit" RENAME TO "Recruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
