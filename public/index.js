import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

let albums;

let getAlbums = async () => {
  try {
    albums = await axios.get("/band");
    renderAlbums(albums);
  } catch (error) {
    console.log(error);
  }
};

function createImageContainer() {
  let newDiv = document.createElement("div");
  newDiv.classList.add("imageContainer");
  return newDiv;
}

function createImage(album) {
  let newImage = document.createElement("img");
  newImage.src = album.coverImage || "https://imgur.com/0uSALUr.png";
  newImage.classList.add("w-60", "m-8", "albumCover");

  newImage.addEventListener("click", () => {
    redirect(album["_id"]);
  });

  return newImage;
}

function createStarIcon() {
  let newStar = document.createElement("i");
  newStar.classList.add("starIcon", "fa-star", "fa-regular", "fa-2xl");
  newStar.addEventListener("click", function () {
    this.classList.toggle("fa-regular");
    this.classList.toggle("fa-solid");
  });
  return newStar;
}

function createTrashIcon(album) {
  let newTrashIcon = document.createElement("i");
  newTrashIcon.classList.add(
    "albumTrashIcon",
    "fa-solid",
    "fa-trash",
    "fa-2xl"
  );
  newTrashIcon.addEventListener("click", () => {
    deleteAlbum(album["_id"]);
  });
  return newTrashIcon;
}

function renderAlbums(albums) {
  for (let i = 0; i < albums.data.length; i++) {
    let imageContainer = createImageContainer();
    let newImage = createImage(albums.data[i]);
    let newStar = createStarIcon();
    let newTrashIcon = createTrashIcon(albums.data[i]);

    imageContainer.appendChild(newImage);
    imageContainer.appendChild(newStar);
    imageContainer.appendChild(newTrashIcon);
    document.querySelector(".albumContainer").appendChild(imageContainer);
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
