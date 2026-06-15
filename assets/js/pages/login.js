function handleCredentialResponse(response) {
  const user = JSON.parse(
    atob(response.credential.split('.')[1])
  );

  localStorage.setItem(
    "akindoUser",
    JSON.stringify(user)
  );

  window.location.href = "../../index.html";
}