import express from "express";
import cors from "cors";
import "dotenv/config";
//import dbConfig from "./db-connect.js";

//import { artistsrouter } from "./routes/artists.js";
//import { releasesrouter } from "./routes/albums.js";
//import { tracksrouter } from "./routes/tracks.js";

import {
  getAllArtists,
  getAllAlbums,
  getArtistById,
  getAlbumById,
  getAllTracks,
  getTrackById,
  getAlbumsByArtistId,
  getTracksByAlbumId,
  getTracksByArtistId,
  deleteArtistById,
  deleteAlbumById,
  deleteTrackById,
  updateArtistById,
  updateAlbumById,
  updateTrackById,
  postTrack,
  postArtist,
  postAlbum,
} from "./controller.js";

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
