
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

---- USER TABLE------------------
CREATE TABLE "public"."user" (
    "id" serial,
    "username" text NOT NULL, 
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "email" text NOT NULL,
    "birthday" date NOT NULL,
    "country" text NOT NULL,
    "password" text NOT NULL,
    "accept_terms" boolean NOT NULL,
    "notification" boolean,
    "role" int,
    "image" text,
    PRIMARY KEY ("id")
);
-- Table Definition ----------------------------------------------
CREATE TABLE "Hazard" (
    "id" serial,
    "user_id" int,
    "approved" boolean NOT NULL DEFAULT false,
    "city" text NOT NULL,
    "state" text NOT NULL,
    "street" text NOT NULL,
    "zip" text NOT NULL,
    "latitude" text NOT NULL,
    "longitude" text NOT NULL,
    "description" text NOT NULL,
    "name" text NOT NULL,
    "image" text NOT NULL,
    "created_date" date NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY ("id"),
    CONSTRAINT "userId" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id")
);

-- Table Definition ----------------------------------------------

-- Table Definition ----------------------------------------------

CREATE TABLE "hazard_Genre" (
    id integer PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL
);

CREATE TABLE "flaggedHazard" (
    id integer PRIMARY KEY,
    who_flagged integer REFERENCES "user"(id),
    is_accurate boolean NOT NULL,
    description text,
    "hazard_Id" integer REFERENCES "Hazard"(id)
);
