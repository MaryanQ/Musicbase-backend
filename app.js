import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import artistsRouter from "./Routes/artists.js";
import tracksRouter from "./Routes/tracks.js";
import albumsRouter from "./Routes/albums.js";

const app = express();
const port = process.env.PORT || 3000;

import bodyParser from "body-parser";
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/artists", artistsRouter);
app.use("/tracks", tracksRouter);
app.use("/albums", albumsRouter);

app.get("/", (req, res) => {
  res.send("Node.js Users REST API 🎉");
});

app.listen(port, () => {
  console.log(`App running on https://musicbaseapp.azurewebsites.net/`);
});
