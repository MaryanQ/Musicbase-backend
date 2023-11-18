MusicBase

MusicBase er en webbaseret applikation der viser kunstnere, kan følgende være API-routes og tilhørende funktioner:

Routes

GET /artists/albums/tracks
-Returnerer en liste over alle artister/albums/tracks

POST /albums/tracks/artists

- opretter et nyt album/track/artists. Dette kan gøres f.eks. ved brug af Postman eller et lignende værktøj.

PUT /albums/tracks/artists

- Opdaterer informationen om et eksisterende album/tracks/artists

DELETE /albums/tracks/artists

- Slet et album/artist/tracks

Dette projekt bruger en MySQL-database til at gemme album-, artist- og track-data. Databaseforbindelsesoplysninger skal konfigureres i .env-filen.

Krav

Brug Postman til test af post, put og delete routes.
Node.js-server hosted på Azure.
MYSQL database hosted på Azure.

Adgang til webapplikationen:

Brugere kan tilgå applikationen via en webbrowser ved at besøge
https://musicbaseapp.azurewebsites.net/

Projektudviklere:
Mariam Salad
Naima Farhan
Aisha Jama
