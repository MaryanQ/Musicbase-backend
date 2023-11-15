import dbConfig from "../db-connect.js";
import { Router } from "express";

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
    albums.albumID = artists.id
    ORDER BY albums.AlbumTitle;`; // sql query

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
artistsRouter.post("/", async (request, response) => {
  try {
    const { name, genre, image, birthdate, gender } = request.body;

    // Indsæt den nye artist i artists-tabellen
    const insertArtistQuery = `
      INSERT INTO artists (name, genre, image, birthdate, gender)
      VALUES (?, ?, ?, ?, ?);
    `;

    const insertArtistValues = [name, genre, image, birthdate, gender];

    const [artistResult] = await dbConfig.execute(
      insertArtistQuery,
      insertArtistValues
    );

    // Hent ID'et for den nyoprettede kunstner
    const artistId = artistResult.insertId;

    response
      .status(201)
      .json({ message: "Artist created successfully", artistId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

artistsRouter.put("/:id", async (request, response) => {
  try {
    const artistId = request.params.id;

    // Udtræk opdaterede kunstneroplysninger fra anmodningens krop
    const { name, birthdate, genres, shortDescription, images } = request.body;

    // Opdater kunstneren i artists-tabellen
    const updateArtistQuery = /*sql*/ `
        UPDATE artists
        SET name = ?, birthdate = ?, genres = ?, shortDescription = ?, images = ?
        WHERE id = ?;
        `;

    const updateArtistValues = [
      name,
      birthdate,
      genres,
      shortDescription,
      images,
      artistId,
    ];

    await dbConnection.execute(updateArtistQuery, updateArtistValues);

    response.json({ message: "Artist updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

//---- PUT HTTP ----//

artistsRouter.put("/:id", (request, response) => {
  try {
    const artistId = request.params.id;

    // Udtræk opdaterede kunstneroplysninger fra anmodningens krop
    const { name, genre, image, birthdate, gender } = request.body;

    if (!name) {
      return response.status(400).json({ error: "ArtistName is required" });
    }

    // Opdater kunstneren i artists-tabellen
    const updateQuery = /*sql*/ `
      UPDATE artists
      SET name = ?, genre = ?, image = ?,  birthdate = ?, gender = ?
      WHERE artists.id = ?;
      `;

    dbConfig.query(
      updateQuery,
      [name, genre, image, birthdate, gender, artistId],
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

    dbConfig.query(deleteArtistQuery, [artistId], (deleteErr) => {
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
