import { Router } from "express";
import dbConfig from "../db-connect.js";
import mysql from "mysql2";

const albumsRouter = Router();

albumsRouter.get("/", async (request, response) => {
  const queryString = /*sql*/ `
    SELECT * FROM artists, albums 
    WHERE albums.id = artists.id
    ORDER BY albums.title;`; // sql query

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

albumsRouter.get("/:id", (request, response) => {
  const id = request.params.id;
  const queryString = /*sql */ `
        SELECT
            albums.title AS albumTitle,
            tracks.id AS trackId,
            tracks.name AS trackTitle,
            tracks.release_date AS releaseDate,
            album_tracks.position
        FROM albums
        JOIN album_tracks
            ON albums.id = album_tracks.album_id
        JOIN tracks
            ON tracks.id = album_tracks.track_id
        WHERE albums.id = ?
        ORDER BY albums.title, album_tracks.position;`;
  const values = [id];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      if (results.length > 0) {
        const album = {
          title: results[0].albumTitle,
          tracks: results.map((track) => {
            return {
              id: track.trackId,
              title: track.trackTitle,
              releaseDate: track.releaseDate,
              position:
                track.position !== null ? track.position : "Not specified", // Provide a default value,
            };
          }),
        };
        response.json(album);
      }
    }
  });
});

export default albumsRouter;
