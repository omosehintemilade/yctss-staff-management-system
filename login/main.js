const inputs = document.querySelectorAll("input");
const login = document.querySelector("#login");

const values = {
  emailOrId: "",
  password: ""
};

inputs.forEach((i) => {
  i.addEventListener("change", ({ target }) => {
    values[i.name] = target.value;
    const err = document.querySelector(`.${i.name}_error`);
    err.style.display = "none";
  });
});

login.addEventListener("click", async () => {
  for (const i of inputs) {
    if (!values[i.name]) {
      console.log(i.name);
      const err = document.querySelector(`.${i.name}_error`);
      err.style.display = "block";
      i.focus();
      return;
    }
  }

  try {
    disableBtn("login");
    const res = await loginFn({
      id: values.emailOrId,
      email: values.emailOrId,
      password: values.password
    });

    disableBtn("login", "Log In");
    // Check if request is success
    if (!res.success) {
      // showToast(res);
    } else {
      //  if request is successful, continue
      // showToast(res);
      saveToLS("user", res.user);
      window.location.replace("/profile/");
    }
  } catch (error) {
    console.log(error);
  }
});

async function loginFn(data) {
  const res = await fetch(baseURL + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}
