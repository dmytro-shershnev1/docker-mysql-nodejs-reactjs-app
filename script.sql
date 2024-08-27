-- Create the app_db database
CREATE DATABASE IF NOT EXISTS 'app-db';

-- Use the app_db database
USE 'app-db';

-- Create the app_tb table
CREATE TABLE `app-db`.`app-tb` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
);
