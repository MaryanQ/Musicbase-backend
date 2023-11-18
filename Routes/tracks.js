import { Router } from "express";
import dbConfig from "../db-connect.js";
import mysql from "mysql2";

const tracksRouter = Router();

// READ all tracks
tracksRouter.get("/", async (request, response) => {
  const queryString = /*sql*/ `
  SELECT *
      FROM tracks
      JOIN artists_tracks ON tracks.id = artists_tracks.track_id
      JOIN artists ON artists_tracks.artist_id = artists.id
      ORDER BY artists.name;
      `;

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

// GET Endpoint "/tracks/:id" - get one track
tracksRouter.get("/:id", (request, response) => {
  const id = request.params.id;
  const queryString = /*sql */ `
   SELECT *
FROM artists
JOIN artists_tracks ON artists.id = artists_tracks.artist_id
JOIN tracks ON artists_tracks.track_id = tracks.id
WHERE tracks.id = ?;

  `;

  const values = [id];
  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results[0]);
    }
  });
});

export default tracksRouter;
