. ~/.bash_profile
rm -R -f ./migrations &&
pipenv run init &&
PGPASSWORD= psql -U postgres -c 'DROP DATABASE example;' || true &&
PGPASSWORD= psql -U postgres -c 'CREATE DATABASE example;' &&
PGPASSWORD= psql -U postgres -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade