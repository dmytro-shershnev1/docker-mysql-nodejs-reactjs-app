-- Create the app_db database
CREATE DATABASE IF NOT EXISTS appdb;

-- Use the app_db database
USE appdb;

-- Create the app_tb table
CREATE TABLE `appdb`.`apptb` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
);
