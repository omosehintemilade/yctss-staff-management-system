const inputs = document.querySelectorAll("input");
const edit = document.querySelector("#add");

const user = getFromDB();
console.log({ user });
const values = {
  name: "Omosehin Ifeoluwa Olayinka",
  started: "62637",
  ended: "474yr8474",
  position: "44u",
  subject: "hello world"
};

inputs.forEach((i) => {
  i.addEventListener("change", ({ target }) => {
    values[i.name] = target.value;
    const err = document.querySelector(`.${i.name}_error`);
    err.style.display = "none";
  });
});

edit.addEventListener("click", async () => {
  // for (const i of inputs) {
  //   if (!values[i.name]) {
  //     const err = document.querySelector(`.${i.name}_error`);
  //     err.style.display = "block";
  //     i.focus();
  //     return;
  //   }
  // }

  console.log({ values });
  disableBtn("add");
  const res = await createExperienceFn();

  disableBtn("add", "Add Experience");
  console.log({ res });
  window.location.replace("/work_experience/");
});

async function createExperienceFn() {
  const res = await fetch(baseURL + "users/experience/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: user.uuid
    },
    body: JSON.stringify(values)
  });
  return await res.json();
}
