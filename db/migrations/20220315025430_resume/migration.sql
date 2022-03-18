/*
  Warnings:

  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Job";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Resume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "prefer" TEXT NOT NULL,
    "advance" TEXT NOT NULL,
    "works" TEXT NOT NULL,
    "educExp" TEXT NOT NULL,
    "inteExp" TEXT NOT NULL,
    "projExp" TEXT NOT NULL,
    "studExp" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
