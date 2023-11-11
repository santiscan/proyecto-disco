let form = document.forms[0];

document.querySelector("#signInFormSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  let userEmail = form.elements[0].value;
  let userPassword = form.elements[1].value;
  let userCredentials = { email: userEmail, password: userPassword };

  logIn(userCredentials);
});

async function logIn(userCredentials) {
  try {
    await axios.post("/login", userCredentials);

    window.location.href = "index.html";
  } catch (error) {
    console.log(error.message);
    swal({
      title: "Could not log in",
      text: "User or password do not match.",
      icon: "error",
      button: "Ok",
    });
  }
}
