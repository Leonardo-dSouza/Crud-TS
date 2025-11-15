/*
  Warnings:

  - Added the required column `cit_latitude` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cit_longitude` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cou_coin` to the `country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cou_flag` to the `country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cou_language` to the `country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "city" ADD COLUMN     "cit_latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cit_longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "country" ADD COLUMN     "cou_coin" VARCHAR(50) NOT NULL,
ADD COLUMN     "cou_flag" VARCHAR(255) NOT NULL,
ADD COLUMN     "cou_language" VARCHAR(50) NOT NULL;
