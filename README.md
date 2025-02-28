###

Typescript learning process.

To use:
1. start postgres
2. psql -U your_username -d postgres<br>

CREATE DATABASE your_database_name;<br>

\q
3. execute migrations file:<br>

psql -U your_username -d your_database_name -f migrations.sql