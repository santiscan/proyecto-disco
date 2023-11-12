import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

onLoad();

let search = window.location.search;
let albumId = search.slice(1).split("&")[0].split("=")[1];
let album;

async function getAlbum() {
  try {
    album = await axios.get(`/band/${albumId}`);
    renderAlbum(album);

    for (let i = 0; i < album.data.songs.length; i++) {
      renderSong(album.data.songs[i], i);
    }
  } catch (error) {
    console.log(error);
  }
}

function renderAlbum(album) {
  let h1 = document.createElement("h1");
  h1.classList.add("text-6xl", "font-bold", "mt-10", "ml-10");
  let upperCaseTitle =
    album.data.title[0].toUpperCase() + album.data.title.substr(1);
  h1.textContent = upperCaseTitle;

  let p = document.createElement("p");
  p.classList.add("mt-10", "ml-10", "w-1/2");
  p.textContent = album.data.description;

  document.querySelector("#albumInfo").appendChild(h1);
  document.querySelector("#albumInfo").appendChild(p);
}

function renderSong(songInfo, songNumber) {
  let div = document.createElement("div");
  div.classList.add(
    "w-4/5",
    "bg-black",
    "text-white",
    "rounded-lg",
    "p-4",
    "h-12",
    "m-4",
    "ml-10",
    "flex",
    "flex-row",
    "justify-between",
    "items-center"
  );

  let span1 = document.createElement("span");
  span1.classList.add("mx-4", "w-1/12");
  span1.textContent = songNumber < 10 ? "0" + (songNumber + 1) : songNumber;

  let span2 = document.createElement("span");
  span2.classList.add("mx-4", "w-8/12", "text-center");
  span2.textContent = songInfo.title;

  let span3 = document.createElement("span");
  span3.classList.add("mx-4", "w-1/12");
  span3.textContent =
    Math.floor(Math.random() * (5 - 2 + 1)) +
    2 +
    ":" +
    Math.floor(Math.random() * (50 - 10 + 1) + 10);

  let span4 = document.createElement("span");
  span4.classList.add("mx-4", "w-1/12");
  let trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash");
  trashIcon.style.color = "#fafafa";
  trashIcon.value = songInfo["_id"];
  trashIcon.addEventListener("click", () => {
    deleteSong(trashIcon.value);
  });
  span4.appendChild(trashIcon);

  let span5 = document.createElement("span");
  span5.classList.add("mx-4", "w-1/12");
  let musicalNoteIcon = document.createElement("i");
  musicalNoteIcon.classList.add("fa-solid", "fa-music");
  musicalNoteIcon.style.color = "#fafafa";
  span5.appendChild(musicalNoteIcon);

  div.appendChild(span1);
  div.appendChild(span2);
  div.appendChild(span3);
  div.appendChild(span4);
  div.appendChild(span5);
  document.querySelector("#songList").appendChild(div);
}

async function deleteSong(songId) {
  try {
    let songs = album.data.songs;

    for (let i = 0; i < songs.length; i++) {
      if (songs[i]["_id"] === songId) {
        songs.splice(i, 1);
      }
    }
    console.log("CHEQUEAR SI TIENE LA CANCION REMOVIDA", album);
    await axios.put(`./band/${albumId}`, album.data);
    await swal("Sucess!", "You added the song", "success");
    window.location.href = `./album.html?album=${albumId}`;
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("#otherAlbums").addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.querySelector("#editAlbum").addEventListener("click", () => {
  window.location.href = `./editAlbum.html?album=${albumId}`;
});

document.querySelector("#addSong").addEventListener("click", () => {
  window.location.href = `./addSong.html?album=${albumId}`;
});

getAlbum();
