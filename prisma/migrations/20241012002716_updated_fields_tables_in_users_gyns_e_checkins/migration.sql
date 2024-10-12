/*
  Warnings:

  - Added the required column `gynId` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "gynId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gynId_fkey" FOREIGN KEY ("gynId") REFERENCES "gyns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
