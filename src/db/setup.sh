
psql -U postgres -f install.sql
PGPASSWORD=1111 psql -U ceasar -d mediacontent -f structure.sql
