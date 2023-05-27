-- CreateTable
CREATE TABLE "Superhero" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "superpowers" TEXT NOT NULL,
    "origin_description" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL,
    "images" TEXT NOT NULL,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);
