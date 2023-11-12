import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

onLoad();

function getInputValues() {
  inputValuesObject = {};
  let form = document.querySelector("form");
  let inputs = form.elements;

  for (let i = 0; i < inputs.length; i++) {
    inputValuesObject[inputs[i].name] = inputs[i].value;
  }

  return inputValuesObject;
}

async function addAlbum(e) {
  try {
    let albumData = getInputValues();
    await axios.post("/band", albumData);
    await swal({
      title: "Album added!",
      text: "Album added successfully.",
      icon: "success",
      button: "Ok",
    });
    document.querySelector("form").reset();
  } catch (error) {
    console.log(error);
    swal({
      title: "Error",
      text: "There was an error. The album may not have been added.",
      icon: "error",
      button: "Ok",
    });
  }
}

document.querySelector("#otherAlbums").addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.querySelector("#addAlbumSaveButton").addEventListener("click", () => {
  addAlbum();
});
