/*
  Warnings:

  - You are about to drop the `Cert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Educ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proj` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stud` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `advance` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `prefer` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `works` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `adva` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cert` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educ` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inte` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pref` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proj` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skil` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stat` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stud` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cert";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Educ";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Inte";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lang";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Proj";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Skil";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Stud";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "pref" TEXT NOT NULL,
    "adva" TEXT NOT NULL,
    "educ" TEXT NOT NULL,
    "inte" TEXT NOT NULL,
    "proj" TEXT NOT NULL,
    "stud" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "skil" TEXT NOT NULL,
    "cert" TEXT NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Resume" ("createdAt", "gender", "id", "updatedAt", "userId") SELECT "createdAt", "gender", "id", "updatedAt", "userId" FROM "Resume";
DROP TABLE "Resume";
ALTER TABLE "new_Resume" RENAME TO "Resume";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
