import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

let albums;

let getAlbums = async () => {
  try {
    albums = await axios.get("/band");
    renderAlbums(albums);
    addToggleToStars();
  } catch (error) {
    console.log(error);
  }
};

function renderAlbums(albums) {
  for (let i = 0; i < albums.data.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("imageContainer");

    let newImage = document.createElement("img");
    newImage.src = albums.data[i].coverImage;
    newImage.classList.add("w-60", "m-8", "albumCover");

    newImage.addEventListener("click", () => {
      redirect(albums.data[i]["_id"]);
    });

    let newStar = document.createElement("i");
    newStar.classList.add("starIcon", "fa-star", "fa-regular", "fa-2xl");

    let newTrashIcon = document.createElement("i");
    newTrashIcon.classList.add(
      "albumTrashIcon",
      "fa-solid",
      "fa-trash",
      "fa-2xl"
    );
    newTrashIcon.addEventListener("click", () => {
      deleteAlbum(albums.data[i]["_id"]);
    });

    newDiv.appendChild(newImage);
    newDiv.appendChild(newStar);
    newDiv.appendChild(newTrashIcon);
    document.querySelector(".albumContainer").appendChild(newDiv);
  }
}

function addToggleToStars() {
  let stars = document.querySelectorAll(".starIcon");

  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function () {
      this.classList.toggle("fa-regular");
      this.classList.toggle("fa-solid");
    });
  }
}

async function deleteAlbum(albumId) {
  try {
    await axios.delete(`./band/${albumId}`);
    await swal("Sucess!", "You deleted the album", "success");
    window.location.href = "./index.html";
  } catch (error) {
    console.log(error);
  }
}

function redirect(id) {
  window.location.href = `./album.html?album=${id}`;
}

onLoad();
getAlbums();

document.querySelector("#addAlbum").addEventListener("click", () => {
  window.location.href = `./addAlbum.html`;
});

document.querySelector("#addUsers").addEventListener("click", () => {
  window.location.href = "./signUp.html";
});

document.querySelector("#logOut").addEventListener("click", logOut);
