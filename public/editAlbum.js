let titleInput = document.querySelector("#albumTitleInput");
let descriptionInput = document.querySelector("#albumDescriptionInput");
let albumImageInput = document.querySelector("#albumImageInput");

let search = window.location.search;
let albumId = search.slice(1).split("&")[0].split("=")[1];

async function editAlbum() {
  try {
    let titleValue = titleInput.value;
    let descriptionValue = descriptionInput.value;
    let imageUrlValue = albumImageInput.value;

    let editData = {};

    titleValue ? (editData["title"] = titleValue) : editData;
    descriptionValue ? (editData["description"] = descriptionValue) : editData;
    imageUrlValue ? (editData["coverImage"] = imageUrlValue) : editData;

    await axios.put(`./band/${albumId}`, editData);
    await swal({
      title: "Album edited!",
      text: "Data updated successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });

    window.location.href = `./album.html?album=${albumId}`;
  } catch (error) {
    console.log(error);
  }
}

document
  .querySelector("#editAlbumSaveButton")
  .addEventListener("click", editAlbum);

document
  .querySelector("#editAlbumCancelButton")
  .addEventListener("click", () => {
    window.location.href = `./album.html?alcum=${albumId}`;
  });

document.querySelector("#otherAlbums").addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.querySelector("#editAlbum").addEventListener("click", () => {
  window.location.href = `./editAlbum.html?album=${albumId}`;
});

document.querySelector("#addSong").addEventListener("click", () => {
  window.location.href = `./addSong.html?album=${albumId}`;
});
