import { Router } from "express";
import dbConfig from "../db-connect.js";
import mysql from "mysql2";
import tracksRouter from "./tracks.js";

const artistsRouter = Router();

//---- GET HTTP ----//

artistsRouter.get("/", (req, res) => {
  const queryString = /*sql*/ `
    SELECT * FROM artists ORDER BY name;`;

  dbConfig.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(results);
    }
  });
});

// GET one artist by ID
artistsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const queryString = /*sql*/ `
    SELECT * 
    FROM artists
    WHERE id=?;`;
  const values = [id];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});

//GET one artists album

artistsRouter.get("/:id/albums", (req, res) => {
  const id = req.params.id;

  const queryString = /*sql*/ `
    SELECT * FROM artists, albums 
    WHERE artists.id=? AND
    albums.id = artists.id
    ORDER BY albums.title;`; // sql query

  const values = [id];

  dbConfig.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

//---- POST HTTP ----//

// Create a new artist
artistsRouter.post("/", (req, res) => {
  try {
    const { name, image, birthdate, gender } = req.body;

    if (!name || !image || !birthdate || !gender) {
      return res.status(400).json({ error: "More info about artist required" });
    }

    // Check if the artistName already exists in the database
    const checkQuery = "SELECT artists.id FROM `artists` WHERE name = ?";

    dbConfig.query(checkQuery, [name], (checkErr, checkResults) => {
      if (checkErr) {
        console.log(checkErr);
        return res
          .status(500)
          .json({ error: "An error occurred while checking artistName" });
      }

      if (checkResults.length > 0) {
        return res.status(400).json({ error: "ArtistName already exists" });
      }

      // Create a new artist in the database
      const insertQuery =
        "INSERT INTO `artists` (name, image, birthdate, gender) VALUES (?, ?, ?, ?, ?)";

      dbConfig.query(
        insertQuery,
        [name, image, birthdate, gender],
        (insertErr, result) => {
          if (insertErr) {
            console.log(insertErr);
            res
              .status(500)
              .json({ error: "An error occurred while creating the artist" });
          } else {
            const newArtistId = result.insertId;
            res.status(201).json({
              artistId: newArtistId,
              message: "Artist created successfully",
            });
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---- PUT HTTP ----//

artistsRouter.put("/:id", (request, response) => {
  try {
    const artistId = request.params.id;

    // Udtræk opdaterede kunstneroplysninger fra anmodningens krop
    const { name, image, birthdate, gender } = request.body;

    if (!name) {
      return response.status(400).json({ error: "ArtistName is required" });
    }

    // Opdater kunstneren i artists-tabellen
    const updateQuery = /*sql*/ `
      UPDATE artists
      SET name = ?, image = ?,  birthdate = ?, gender = ?
      WHERE artists.id = ?;
      `;

    connection.query(
      updateQuery,
      [name, image, birthdate, gender, artistId],
      (updateErr) => {
        if (updateErr) {
          console.log(updateErr);
          response.status(500).json({
            error: "An error occurred while updating the artist",
          });
        } else {
          response.status(200).json({
            artistId,
            message: "Artist updated successfully",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

//---- DELETE HTTP ----//

artistsRouter.delete("/:id", (request, response) => {
  try {
    const artistId = request.params.id;

    // Slet kunstneren fra artists-tabellen
    const deleteArtistQuery = /*sql*/ `
      DELETE FROM artists
      WHERE id = ?;
    `;

    connection.query(deleteArtistQuery, [artistId], (deleteErr) => {
      if (deleteErr) {
        console.error(deleteErr);
        response.status(500).json({ message: "Internal server error" });
      } else {
        // Hvis du vil slette eventuelle tilknyttede data, f.eks. sange eller albums, skal du håndtere det her.
        response.json({ message: "Artist deleted successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default artistsRouter;
