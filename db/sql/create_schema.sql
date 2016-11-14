CREATE SCHEMA `auto_plan` ;
CREATE USER 'auto'@'%' IDENTIFIED BY 'auth';

GRANT ALL privileges ON auto_plan.* TO 'auto'@'%'IDENTIFIED BY 'auth';