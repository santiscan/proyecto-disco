import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

onLoad();

let album;
let albumId = window.location.href.split("album=")[1];

async function getAlbum() {
  try {
    let data = await axios.get(`./band/${albumId}`);
    console.log(data.data);
    album = data.data;
  } catch (error) {
    console.log(error);
  }
}

getAlbum();

async function addSong() {
  try {
    let songData = {};
    songData["title"] = document.querySelector("#songTitleInput").value;
    songData["duration"] = document.querySelector("#songDurationInput").value;

    album.songs.push(songData);

    await axios.put(`./band/${albumId}`, album);
    await swal("Sucess!", "You added the song", "success");
    document.querySelector("#songTitleInput").value = "";
    document.querySelector("#songDurationInput").value = "";
  } catch (error) {
    swal("Error", "There was a problem adding the song", "error");
    console.log(error);
    document.querySelector("#songTitleInput").value = "";
    document.querySelector("#songDurationInput").value = "";
  }
}

document.querySelector("#saveSongButton").addEventListener("click", addSong);
document.querySelector("#cancelSongButton").addEventListener("click", () => {
  window.location.href = `./album.html?album=${albumId}`;
});

// document.querySelector("#saveButton").addEventListener("click", clickSuccess);

// function clickSuccess() {
//   swal("Sucess!", "You added the song", "success");
// }
