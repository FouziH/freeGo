---- USER TABLE------------------
CREATE TABLE "user" (
    "id" serial,
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
CREATE TABLE "hazard" (
    "id" serial,
    "user_id" int,
    "genre_id" int,
    "approved" boolean NOT NULL DEFAULT false,
    "city" text NOT NULL,
    "state" text NOT NULL,
    "street" text NOT NULL,
    "zip" text NOT NULL,
    "latitude" text NOT NULL,
    "longitude" text NOT NULL,
    "description" text NOT NULL,
    "threat_level" text NOT NULL, 
    "name" text NOT NULL,
    "image" text NOT NULL,
    "created_date" date NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY ("id"),
    CONSTRAINT "userId" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    CONSTRAINT "genreId" FOREIGN KEY ("genre_id") REFERENCES "hazard_genre"("id")
    
);

-- Table Definition ----------------------------------------------


CREATE TABLE "hazard_genre" (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL
);
DROP TABLE "hazard_genre"
-- Table Definition ----------------------------------------------

CREATE TABLE "flagged_hazard" (
    id serial PRIMARY KEY,
    who_flagged integer REFERENCES "user"(id),
    is_accurate boolean NOT NULL,
    description text,
    "hazard_id" integer REFERENCES "hazard"(id)
);
