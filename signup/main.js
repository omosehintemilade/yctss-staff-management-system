const inputs = document.querySelectorAll("input");
const signup = document.querySelector("#signup");

const values = {
  email: "johnsmith@example.com",
  phonenumber: "08103826574",
  password: "1234",
  confirmpassword: "1234"
};

inputs.forEach((i) => {
  i.addEventListener("change", ({ target }) => {
    values[i.name] = target.value;
    const err = document.querySelector(`.${i.name}_error`);
    err.style.display = "none";
  });
});

signup.addEventListener("click", async () => {
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
    email: values.email,
    phonenumber: values.phonenumber,
    password: values.password
  };

  try {
    disableBtn("signup");
    const res = await createUser(user);
    disableBtn("signup", "Sign Up");

    if (!res.success) {
      showToast(res);
    } else {
      //  if request is successful, continue
      showToast(res);
      window.location.replace("/login/");
    }
  } catch (error) {
    console.log(error);
  }
});

async function createUser(data) {
  const res = await fetch(baseURL + "users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}
