async function onLoad() {
  try {
    let userData = await axios.get("/me");
    console.log(userData.data);
    let userName = userData.data.name;
    let userLastName = userData.data.surname;
    let userFullName =
      userName.charAt(0).toUpperCase() +
      userName.slice(1) +
      " " +
      userLastName.charAt(0).toUpperCase() +
      userLastName.slice(1);

    document.querySelector("#sidebarUserName").textContent = userFullName;
  } catch (error) {
    console.log(error);
    window.location.href = "./login.html";
  }
}

async function logOut() {
  try {
    await axios.post("/logout");
    window.location.href = "./login.html";
  } catch (error) {
    console.log(error.message);
  }
}

export { onLoad, logOut };
