# Event Attendees registrator

## Installation

### Backend instalation

Create and fill .env file inside backend directory as in .env.example.

	cd /backend
	npm install
	npm run start
	
Great backend is ready!

### Frontend instalation

	cd /frontend
	npm install
	npm run start
	
Great fornt is ready!

### DB instalation

For this project I used a MySQL database. You can use the /DB folder for the exact DB used in this project. Or you can type this query to create exactly the same one.

```SQL
CREATE SCHEMA events_organizer;

CREATE TABLE events_organizer.users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL
);

CREATE TABLE events_organizer.event (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone DECIMAL(9,0) NOT NULL,
  userid INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES events_organizer.users(id)
);
```

