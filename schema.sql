DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS learning;
DROP TABLE IF EXISTS humility;
DROP TABLE IF EXISTS openness;
DROP TABLE IF EXISTS generosity;
DROP TABLE IF EXISTS autonomy;
DROP TABLE IF EXISTS honesty;


CREATE TABLE users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username varchar,
password varchar,
first_name varchar,
last_name varchar,
email varchar,
timestamp DATE DEFAULT (datetime('now','localtime'))
);

CREATE TABLE learning(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
question1 text,
answer1 text,
question2 text,
answer2 text,
question3 text,
answer3 text,
random text
);

CREATE TABLE humility(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
question1 text,
answer1 text,
question2 text,
answer2 text,
question3 text,
answer3 text,
random text
);

CREATE TABLE openness(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
question1 text,
answer1 text,
question2 text,
answer2 text,
question3 text,
answer3 text,
random text
);

CREATE TABLE tolerance(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
question1 text,
answer1 text,
question2 text,
answer2 text,
question3 text,
answer3 text,
random text
);

CREATE TABLE generosity(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
question1 text,
answer1 text,
question2 text,
answer2 text,
question3 text,
answer3 text,
random text
);

CREATE TABLE autonomy(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
answer text,
answer1 text,
answer2 text,
answer3 text,
answer4 text,
answer5 text,
answer6 text,
answer7 text,
answer8 text,
answer9 text
);


CREATE TABLE honesty(
id Integer Primary KEY AUTOINCREMENT,
username varchar,
timestamp DATE DEFAULT (datetime('now','localtime')),
user_id integer,
answer text,
answer1 text,
answer2 text,
answer3 text,
answer4 text,
answer5 text,
answer6 text,
answer7 text,
answer8 text,
answer9 text
);



