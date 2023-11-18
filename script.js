"use strict";

let allArtists, allAlbums, allTracks;

window.addEventListener("load", start);

async function start() {
  await GetArtists();
  await GetAlbums();
  await GetTracks();
}

async function GetArtists() {
  const response = await fetch(
    `https://musicbaseapp.azurewebsites.net/artists`
  );
  allArtists = await response.json();
  displayArtists(allArtists);
}

async function displayArtists(artists) {
  const tbody = document.querySelector("#artists-container");
  tbody.innerHTML = "";

  for (const artist of artists) {
    const html = /*html*/ `
      <div class="grid-item">
        <img class="image" src=${artist.image} alt="${artist.name}"/>
        <div><h4>${artist.name}</h4>
        <h5>Gender: ${artist.gender}</h5></div>
        <div class="btns-container">
          <button id="btn-delete">Delete</button>
          <button id="btn-edit">Edit</button>
        </div>
      </div>
    `;

    tbody.insertAdjacentHTML("beforeend", html);
  }
}

async function GetTracks() {
  const response = await fetch(`https://musicbaseapp.azurewebsites.net/tracks`);
  allTracks = await response.json();
  displayTracks(allTracks);
}

async function displayTracks(tracks) {
  const tbody = document.querySelector("#tracks-container");
  tbody.innerHTML = "";

  for (const track of tracks) {
    const html = /*html*/ `
      <tr>
        <td><h4> ${track.name}</h4></td>
        <td>${track.title}</td>
        <td>${track.release_date}</td>
      </tr>
    `;

    tbody.insertAdjacentHTML("beforeend", html);
  }
}

async function GetAlbums() {
  const response = await fetch(`https://musicbaseapp.azurewebsites.net/albums`);
  allAlbums = await response.json();
  displayAlbums(allAlbums);
}

async function displayAlbums(albums) {
  const tbody = document.querySelector("#albums-container");
  tbody.innerHTML = "";

  for (const album of albums) {
    const html = /*html*/ `
      <tr>
        <td class="image2"><img src="${album.image}"></td>
        <td><h4> ${album.title}</h4></td>
        <td>${album.release_date}</td>
      </tr>
    `;

    tbody.insertAdjacentHTML("beforeend", html);
  }
}
function search() {
  console.log("yaay");
  const searchInput = document
    .querySelector("#searchInput")
    .value.toLowerCase();

  if (allArtists) {
    const filteredArtists = allArtists.filter((artist) =>
      artist.name.toLowerCase().includes(searchInput)
    );
    displayArtists(filteredArtists);
  }

  if (allAlbums) {
    const filteredAlbums = allAlbums.filter((album) =>
      album.title.toLowerCase().includes(searchInput)
    );
    displayAlbums(filteredAlbums);
  }

  if (allTracks) {
    const filteredTracks = allTracks.filter((track) =>
      track.title.toLowerCase().includes(searchInput)
    );
    displayTracks(filteredTracks);
  }
}
