/*
  Warnings:

  - Added the required column `number` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "prefer" TEXT NOT NULL,
    "advance" TEXT NOT NULL,
    "educ" TEXT NOT NULL,
    "inte" TEXT NOT NULL,
    "proj" TEXT NOT NULL,
    "stud" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "skil" TEXT NOT NULL,
    "cert" TEXT NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Resume" ("advance", "age", "cert", "createdAt", "educ", "gender", "id", "inte", "lang", "prefer", "proj", "skil", "status", "stud", "updatedAt", "userId") SELECT "advance", "age", "cert", "createdAt", "educ", "gender", "id", "inte", "lang", "prefer", "proj", "skil", "status", "stud", "updatedAt", "userId" FROM "Resume";
DROP TABLE "Resume";
ALTER TABLE "new_Resume" RENAME TO "Resume";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
