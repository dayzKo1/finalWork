/*
  Warnings:

  - You are about to drop the column `adva` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `pref` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `stat` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `advance` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefer` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Resume` table without a default value. This is not possible if the table is not empty.

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
INSERT INTO "new_Resume" ("cert", "createdAt", "educ", "gender", "id", "inte", "lang", "proj", "skil", "stud", "updatedAt", "userId") SELECT "cert", "createdAt", "educ", "gender", "id", "inte", "lang", "proj", "skil", "stud", "updatedAt", "userId" FROM "Resume";
DROP TABLE "Resume";
ALTER TABLE "new_Resume" RENAME TO "Resume";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
