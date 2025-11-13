-- CreateTable
CREATE TABLE "continent" (
    "con_id" SERIAL NOT NULL,
    "con_name" VARCHAR(100) NOT NULL,
    "con_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "continent_pkey" PRIMARY KEY ("con_id")
);

-- CreateTable
CREATE TABLE "country" (
    "cou_id" SERIAL NOT NULL,
    "cou_name" VARCHAR(80) NOT NULL,
    "cou_population" INTEGER NOT NULL,
    "con_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("cou_id")
);

-- CreateTable
CREATE TABLE "city" (
    "cit_id" SERIAL NOT NULL,
    "cit_name" VARCHAR(80) NOT NULL,
    "cit_population" INTEGER NOT NULL,
    "cou_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("cit_id")
);

-- CreateTable
CREATE TABLE "user" (
    "use_id" SERIAL NOT NULL,
    "use_email" VARCHAR(255) NOT NULL,
    "use_password" VARCHAR(255) NOT NULL,
    "use_name" VARCHAR(100) NOT NULL,
    "use_role" VARCHAR(20) NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("use_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "continent_con_name_key" ON "continent"("con_name");

-- CreateIndex
CREATE UNIQUE INDEX "country_cou_name_key" ON "country"("cou_name");

-- CreateIndex
CREATE UNIQUE INDEX "city_cit_name_key" ON "city"("cit_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_use_email_key" ON "user"("use_email");

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_con_id_fkey" FOREIGN KEY ("con_id") REFERENCES "continent"("con_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_cou_id_fkey" FOREIGN KEY ("cou_id") REFERENCES "country"("cou_id") ON DELETE CASCADE ON UPDATE CASCADE;
