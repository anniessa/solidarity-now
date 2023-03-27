-- database: solidarity-now

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "picture" VARCHAR (1000),
    "isAdmin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tag_name" VARCHAR (80) 
);

CREATE TABLE "posts" (
	"id" SERIAL PRIMARY KEY, 
	"post_type" VARCHAR (80) NOT NULL,
	"content" TEXT NOT NULL,
	"additional_resource" VARCHAR (1000) NOT NULL,
	"user_id" INT
);
	

CREATE TABLE "tags_posts" (
	"id" SERIAL PRIMARY KEY,
	"tags_id" INT REFERENCES "tags",
	"posts_id" INT REFERENCES "posts" ON DELETE CASCADE
);

INSERT INTO "tags" ("tag_name")
VALUES ('financial solidarity'), ('direct action'), ('education'), ('clothing'), ('food'), ('legal'), ('housing'), ('childcare'), 
('creativity'), ('healthcare'), ('free stuff'), ('other');
