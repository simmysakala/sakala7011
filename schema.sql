-- Creates the records table. Safe to run more than once.
CREATE TABLE IF NOT EXISTS records (
  id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       VARCHAR(80)  NOT NULL CHECK (char_length(title) BETWEEN 3 AND 80),
  category    VARCHAR(40)  NOT NULL CHECK (char_length(category) BETWEEN 2 AND 40),
  description VARCHAR(300) NOT NULL CHECK (char_length(description) BETWEEN 5 AND 300),
  status      VARCHAR(20)  NOT NULL CHECK (status IN ('Pending', 'In progress', 'Completed'))
);
