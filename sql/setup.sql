-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists dogs;

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