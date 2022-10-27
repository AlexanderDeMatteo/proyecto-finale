. ~/.bash_profile
rm -R -f ./migrations &&
pipenv run init &&
PGPASSWORD=13797193 psql -U postgres -c 'DROP DATABASE example;' || true &&
PGPASSWORD=13797193 psql -U postgres -c 'CREATE DATABASE example;' &&
PGPASSWORD=13797193 psql -U postgres -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade