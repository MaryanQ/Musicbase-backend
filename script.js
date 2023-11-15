async function displayArtists() {
  try {
    const response = await fetch("https://musicbase2.azurewebsites.net/");
    const artists = await response.json();

    const artistsContainer = document.getElementById("artists-container");
    artistsContainer.innerHTML = ""; // Tøm containeren først

    artists.forEach((artist) => {
      const artistElement = document.createElement("div");
      artistElement.textContent = artist.artistName;
      artistsContainer.appendChild(artistElement);
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
}

// Kald funktionen for at vise artister, når siden indlæses
window.onload = displayArtists;
