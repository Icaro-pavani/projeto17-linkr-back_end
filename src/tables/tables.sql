CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(40) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(30) UNIQUE NOT NULL,
    "picture" TEXT NOT NULL
);

CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "idUser" INTEGER NOT NULL REFERENCES "users"("id"),
    "description" VARCHAR(500),
    "link" TEXT NOT NULL,
    "titleLink" TEXT,
    "imageLink" TEXT NOT NULL,
    "descriptionLink" TEXT NOT NULL
);

CREATE TABLE "likesPosts" (
    "id" SERIAL PRIMARY KEY,
    "idUser" INTEGER NOT NULL REFERENCES "users"("id"),
    "idPost" INTEGER NOT NULL REFERENCES "posts"("id"),
    CONSTRAINT "uniqueLikes" UNIQUE ("idUser","idPost");
);

CREATE TABLE "hashtags" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE "hashtagsPosts" (
    "id" SERIAL PRIMARY KEY,
    "idHashtag" INTEGER NOT NULL REFERENCES "hashtags"("id"),
    "idPost" INTEGER NOT NULL REFERENCES "posts"("id")
);
