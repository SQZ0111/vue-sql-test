# Creating a MySQL Backend

## Create a new User in database

In order to connect (I would not suggest connecting as root), create a new user in the MySQL CLI.

1. **Log in as root**

   Open a terminal and log into MySQL as the root user:

   ```bash
   mysql -u root -p
   ```

2. **Create a new user**

   Within the MySQL CLI, create a new user:

   ```sql
   CREATE USER 'new_username'@'localhost' IDENTIFIED BY 'new_password';
   CREATE USER 'herbert'@'localhost' IDENTIFIED BY 'my_secure_password';
   GRANT ALL PRIVILEGES ON database_name.* TO 'new_username'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Retest new user with new password**

   Test logging in with the new user credentials:

   ```bash
   mysql -u <newuser> -p
   ```

## Create the Database either with MySQL Workbench or CLI

Queries are finished like this: `SELECT * FROM <table>;`

- `CREATE DATABASE <name>;`
- `USE <name>;`

- ```sql
  CREATE TABLE <name> (
    <entry> <datatype> PRIMARY KEY <value/AUTO_INCREMENT/DEFAULT <value>>,
    <entry> <datatype> NOT NULL <value/AUTO_INCREMENT/DEFAULT <value>>
  );
  ```
