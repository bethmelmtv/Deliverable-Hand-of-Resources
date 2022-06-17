-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists dogs;
DROP table if exists cats;
DROP table if exists grocery;
DROP table if exists cities;

CREATE table dogs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  breed VARCHAR NOT NULL,
  family VARCHAR NOT NULL
);

INSERT INTO dogs (name, breed, family) VALUES
('Frankie', 'Pomeranian','Beths'),
('Jeep','Labrador','Danis'),
('Oscar','Poodle','Rebekahs');


CREATE table cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  breed VARCHAR NOT NULL,
  family VARCHAR NOT NULL
);

INSERT INTO cats (name, breed, family) VALUES
('Tiger', 'Tabby','Carol'),
('Aniah','Persian','Jared'),
('Anelise','Munchkin cat','Shreya');

CREATE table grocery(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  store VARCHAR NOT NULL,
  location INT NOT NULL,
  knownfor VARCHAR NOT NULL
);

INSERT INTO grocery (store, location, knownfor) VALUES
('Trader Joes', 157, 'cheese and wine'),
('Sprouts', 200, 'sandwiches'),
('Whole Foods', 349, 'expensive');


CREATE table cities(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  temperature VARCHAR NOT NULL
);

  INSERT INTO cities(city, state, temperature) VALUES
  ('Chicago', 'Illinois', 'cold'),
  ('San Francisco', 'California', 'foggy'),
  ('Mountain View', 'California', 'dosent know what it wants');
