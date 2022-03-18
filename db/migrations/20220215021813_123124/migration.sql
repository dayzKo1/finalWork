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
    CONSTRAINT "Recruit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recruit" ("createdAt", "description", "detail", "id", "name", "salaryMax", "salaryMin", "updatedAt", "userId") SELECT "createdAt", "description", "detail", "id", "name", "salaryMax", "salaryMin", "updatedAt", "userId" FROM "Recruit";
DROP TABLE "Recruit";
ALTER TABLE "new_Recruit" RENAME TO "Recruit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
