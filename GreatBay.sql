DROP DATABASE IF EXISTS foodbay_db;

CREATE DATABASE foodbay_db;

USE foodbay_db;

CREATE TABLE foods (
  id INT NOT NULL AUTO_INCREMENT,
  food VARCHAR(30) NOT NULL,
  cuisine VARCHAR(30) NOT NULL,
  serveHot BOOLEAN NOT NULL,
  spiceLevel INT NOT NULL,
  price DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

