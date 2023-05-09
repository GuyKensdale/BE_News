## setup

# In order for this repo to work you will have to do the following

1. run 'npm install' in terminal
2. run 'npm i' in terminal
3. create a test and development .env files 'env.test' && 'env.development'
   You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). please double check that these .env files are .gitignored.
