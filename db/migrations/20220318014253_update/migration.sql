/*
  Warnings:

  - You are about to drop the column `certificate` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `educExp` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `inteExp` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `projExp` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `studExp` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `age` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Educ" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Educ_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Inte_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proj" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Proj_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Stud_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Lang_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Skil_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ResumeId" INTEGER NOT NULL,
    CONSTRAINT "Cert_ResumeId_fkey" FOREIGN KEY ("ResumeId") REFERENCES "Resume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "recruitId" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Apply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Apply_recruitId_fkey" FOREIGN KEY ("recruitId") REFERENCES "Recruit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Apply" ("createdAt", "id", "recruitId", "updatedAt", "userId") SELECT "createdAt", "id", "recruitId", "updatedAt", "userId" FROM "Apply";
DROP TABLE "Apply";
ALTER TABLE "new_Apply" RENAME TO "Apply";
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
    "works" TEXT NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Resume" ("advance", "createdAt", "id", "prefer", "status", "updatedAt", "userId", "works") SELECT "advance", "createdAt", "id", "prefer", "status", "updatedAt", "userId", "works" FROM "Resume";
DROP TABLE "Resume";
ALTER TABLE "new_Resume" RENAME TO "Resume";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
