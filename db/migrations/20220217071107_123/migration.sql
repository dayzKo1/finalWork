/*
  Warnings:

  - Added the required column `avai` to the `Recruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Recruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educ` to the `Recruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Recruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Recruit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recruit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "salaryMax" TEXT,
    "salaryMin" TEXT,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "educ" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "avai" TEXT NOT NULL,
    CONSTRAINT "Recruit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recruit" ("createdAt", "description", "detail", "id", "name", "salaryMax", "salaryMin", "updatedAt", "userId") SELECT "createdAt", "description", "detail", "id", "name", "salaryMax", "salaryMin", "updatedAt", "userId" FROM "Recruit";
DROP TABLE "Recruit";
ALTER TABLE "new_Recruit" RENAME TO "Recruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
