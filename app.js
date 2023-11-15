import express from "express";
import cors from "cors";
import "dotenv/config";
import mysql from "mysql2";

import artistsRouter from "./Routes/artists.js";
//import tracksRouter from "./Routes/tracks.js";
//import albumsRouter from "./Routes/albums.js";

const app = express();
const port = process.env.PORT || 3222;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("appen virker");
});

app.use("/artists", artistsRouter);
//app.use("/tracks", tracksRouter);
//app.use("/albums", albumsRouter);

app.get("/", (req, res) => {
  res.send("Node.js Users REST API 🎉");
});

/*

// ========== APP SETUP ========== //
const app = express();
const port = process.env.PORT || 3222;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("appen virker");
});

app.get("/artists", getAllArtists);

app.get("/albums", getAllAlbums);

app.get("/artists/:id", getArtistById);

app.get("/albums/:id", getAlbumById);

app.get("/tracks", getAllTracks);

app.get("/tracks/:id", getTrackById);

app.get("/artists/:id/albums", getAlbumsByArtistId);

app.get("/albums/:id/tracks", getTracksByAlbumId);

app.get("/artists/:id/tracks", getTracksByArtistId);

app.post("/artists", postArtist);

app.post("/tracks", postTrack);

app.post("/albums", postAlbum);

app.put("/artists/:id", updateArtistById);

app.put("/albums/:id", updateAlbumById);

app.put("/tracks/:id", updateTrackById);

app.delete("/artists/:id", deleteArtistById);

app.delete("/albums/:id", deleteAlbumById);

app.delete("/tracks/:id", deleteTrackById);
*/
