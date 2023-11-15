import { Router } from "express";
import connection from "../database.js";
import mysql from "mysql2";
import dbConfig from "../db-connect.js";

const albumsRouter = Router();

albumsRouter.get("/", async (request, response) => {
  const queryString = /*sql*/ `
    SELECT * FROM artists, albums 
    WHERE albums.albumID = artists.id
    ORDER BY albums.AlbumTitle;`; // sql query

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
            albums.AlbumTitle AS albumTitle,
            tracks.TrackID AS trackId,
            tracks.TrackName AS trackTitle,
            tracks.ReleaseDate AS releaseDate,
            album_tracks.position
        FROM albums
        JOIN album_tracks
            ON albums.AlbumID = album_tracks.AlbumID
        JOIN tracks
            ON tracks.TrackID = album_tracks.TrackID
        WHERE albums.AlbumID = ?
        ORDER BY albums.AlbumTitle, album_tracks.position;`;
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
