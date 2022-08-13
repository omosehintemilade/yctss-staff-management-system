const inputs = document.querySelectorAll("input");
const signup = document.querySelector("#signup");

const values = {
  email: "",
  phonenumber: "",
  password: "",
  confirmpassword: ""
};

inputs.forEach((i) => {
  i.addEventListener("change", ({ target }) => {
    values[i.name] = target.value;
    const err = document.querySelector(`.${i.name}_error`);
    err.style.display = "none";
  });
});

signup.addEventListener("click", () => {
  for (const i of inputs) {
    if (!values[i.name]) {
      console.log(i.name);
      const err = document.querySelector(`.${i.name}_error`);
      err.style.display = "block";
      i.focus();
      return;
    }
  }

  if (values.password !== values.confirmpassword) {
    const err = document.querySelector(".confirmpassword_error");
    err.style.display = "block";
    const input = document.querySelector("input[name='confirmpassword']");
    input.focus();
    return;
  }

  const user = {
    id: generateRandomCode(),
    email: values.email,
    phonenumber: values.phonenumber,
    password: values.password
  };

  saveToDB(user);

  window.location.replace("/login/");
});
