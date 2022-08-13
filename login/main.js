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

login.addEventListener("click", () => {
  for (const i of inputs) {
    if (!values[i.name]) {
      console.log(i.name);
      const err = document.querySelector(`.${i.name}_error`);
      err.style.display = "block";
      i.focus();
      return;
    }
  }

  const user = getFromDB();
  console.log({ user });

  if (values.emailOrId != user.email && values.emailOrId != user.id) {
    alert("Email Address or Staff ID not registered with us");
  } else if (values.password != user.password) {
    alert("Wrong Login Credentials");
  } else {
    window.location.replace("/profile/");
  }
});
