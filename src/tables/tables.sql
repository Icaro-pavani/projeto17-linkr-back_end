CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(40) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(30) UNIQUE NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "idPost" INTEGER DEFAULT NULL,
    "idUser" INTEGER NOT NULL REFERENCES "users"("id"),
    "description" VARCHAR(500),
    "link" TEXT NOT NULL,
    "titleLink" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "descriptionLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL
);

CREATE TABLE "likesPosts" (
    "id" SERIAL PRIMARY KEY,
    "idUser" INTEGER NOT NULL REFERENCES "users"("id"),
    "idPost" INTEGER NOT NULL REFERENCES "posts"("id"),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT "uniqueLikes" UNIQUE ("idUser","idPost")
);

CREATE TABLE "hashtags" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtagsPosts" (
    "id" SERIAL PRIMARY KEY,
    "idHashtag" INTEGER NOT NULL REFERENCES "hashtags"("id"),
    "idPost" INTEGER NOT NULL REFERENCES "posts"("id"),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "follows" (
    "id" SERIAL PRIMARY KEY,
    "idUser" INTEGER NOT NULL REFERENCES "users"("id"),
    "following" INTEGER NOT NULL REFERENCES "users"("id"),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT "uniqueFollows" UNIQUE ("idUser","following")
);

CREATE TABLE "comments" (
    "id" SERIAL PRIMARY KEY,
    "idPost" INTEGER NOT NULL REFERENCES "posts"("id"),
    "idUser" INTEGER NOT NULL REFERENCES "users"("id"),
    "comment" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);