// Check if password length is greater than 6 characters
let passwordInput = document.querySelector("#password");

passwordInput.addEventListener("keyup", function () {
  if (this.value.length > 0 && this.value.length < 6) {
    document.querySelector("#passwordWarning").classList.remove("hidden");
  } else {
    document.querySelector("#passwordWarning").classList.add("hidden");
  }
});

let form = document.querySelector("form");

// check if all fields are completed
form.addEventListener("submit", (event) => {
  for (let i = 0; i < form.elements.length - 1; i++) {
    if (form.elements[i].value === "") {
      event.preventDefault();
      swal({
        title: "Falta información",
        text: "Debes completar todos los campos del formulario ;)",
        icon: "warning",
      });
      return;
    }
  }
  register(event);
});

// functions for user creation
function getInputValues() {
  inputValuesObject = {};
  let form = document.querySelector("form");
  let inputs = form.elements;

  for (let i = 0; i < inputs.length; i++) {
    inputValuesObject[inputs[i].name] = inputs[i].value;
  }

  return inputValuesObject;
}

async function register(event) {
  event.preventDefault();
  try {
    let userData = getInputValues();
    await axios.post("./user", userData);
    await swal({
      title: "User created!",
      text: "User created successfully.",
      icon: "success",
      button: "Ok",
    });
    document.querySelector("form").reset();
  } catch (error) {
    console.log(error);
    console.log(error.response.data);

    swal({
      title: "Error",
      text: `${error.response.data}`,
      icon: "error",
      button: "Ok",
    });
  }
}
