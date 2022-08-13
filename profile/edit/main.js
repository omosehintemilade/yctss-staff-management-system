const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");
const edit = document.querySelector("#edit");
const img_wrapper = document.querySelector(".img_wrapper");
const change_btn_wrapper = img_wrapper.querySelector(".change_btn_wrapper");
const fileinput = img_wrapper.querySelector("#file");
const image = document.querySelector(".profile_img");

const values = {
  surname: "",
  firstname: "",
  lastname: "",
  email: "",
  title: "",
  phonenumber: "",
  profile_pics: ""
};
const user = getFromDB();
console.log({ user });

// Set input values
for (const i of inputs) {
  const name = i.name;
  if (user[name]) {
    values[name] = i.value = user[name];
  }
}
// Set select value
if (user.title) {
  values.title = select.value = user.title;
}

// Set select value
if (user.profile_pics) {
  image.src = user.profile_pics;
}

inputs.forEach((i) => {
  i.addEventListener("change", ({ target }) => {
    if (i.type == "file") {
      const img_url = URL.createObjectURL(i.files[0]);
      values.profile_pics = image.src = img_url;
    } else {
      values[i.name] = target.value;
      const err = document.querySelector(`.${i.name}_error`);
      err.style.display = "none";
    }
  });
});

select.addEventListener("change", ({ target }) => {
  values["title"] = target.value;
  const err = document.querySelector(".title_error");
  err.style.display = "none";
});

img_wrapper.addEventListener("mouseenter", () => {
  change_btn_wrapper.style.display = "grid";
});

img_wrapper.addEventListener("mouseleave", () => {
  change_btn_wrapper.style.display = "none";
});

edit.addEventListener("click", () => {
  for (const i of inputs) {
    if (i.type != "file") {
      if (!values[i.name]) {
        const err = document.querySelector(`.${i.name}_error`);
        err.style.display = "block";
        i.focus();
        return;
      }
    }
  }

  if (!values["title"]) {
    const err = document.querySelector(`.title_error`);
    err.style.display = "block";
    return;
  }
  // console.log(select, select.value);
  console.log({ values });
  const updatedUser = {
    ...user,
    ...values
  };

  saveToDB(updatedUser);
  window.location.replace("/profile/");
});
