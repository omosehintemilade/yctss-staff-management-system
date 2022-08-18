const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const edit = document.querySelector("#edit");
const img_wrapper = document.querySelector(".img_wrapper");
const change_btn_wrapper = img_wrapper.querySelector(".change_btn_wrapper");
const image = document.querySelector(".profile_img");
let file = {};
const values = {};
const user = getFromDB();
console.log({ user });

console.log({ selects });

// Set input values
for (const i of inputs) {
  const name = i.name;
  if (user[name]) {
    values[name] = i.value = user[name];
  }
}

// Set select values
for (const s of selects) {
  const name = s.name;
  if (user[name]) {
    values[name] = s.value = user[name];
  }
}

// Set select value
if (user.profile_pics) {
  image.src = user.profile_pics;
}

inputs.forEach((i) => {
  i.addEventListener("change", ({ target }) => {
    if (i.type == "file") {
      file = i.files[0];
      const img_url = URL.createObjectURL(file);
      values.profile_pics = image.src = img_url;
    } else {
      values[i.name] = target.value;
      const err = document.querySelector(`.${i.name}_error`);
      console.log(i.name, err);
      err.style.display = "none";
    }
  });
});

selects.forEach((s) => {
  s.addEventListener("change", ({ target }) => {
    values[s.name] = target.value;
    const err = document.querySelector(`.${s.name}_error`);
    console.log(s.name, err);
    err.style.display = "none";
  });
});

img_wrapper.addEventListener("mouseenter", () => {
  change_btn_wrapper.style.display = "grid";
});

img_wrapper.addEventListener("mouseleave", () => {
  change_btn_wrapper.style.display = "none";
});

edit.addEventListener("click", async () => {
  for (const s of selects) {
    if (!values[s.name]) {
      const err = document.querySelector(`.${s.name}_error`);
      err.style.display = "block";
      s.focus();
      return;
    }
  }
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

  // saveToDB(updatedUser);
  try {
    disableBtn("edit");

    disableBtn("edit", "Save Data");

    if (file.name) {
      const res = await uploadProfilePicsFn();

      // Check if request is success
      if (!res.success) {
        showToast(res);
      } else {
        showToast(res);
        values.profile_pics = `${baseURL}${res.url}`;
      }
    }

    const res = await editBoidataFn(values);
    // Check if request is success
    if (!res.success) {
      showToast(res);
    } else {
      //  if request is successful, continue
      showToast(res);
      saveToLS("user", res.user);
      window.location.replace("/profile/");
    }
  } catch (error) {
    console.log(error);
  }
});

async function editBoidataFn(data) {
  const res = await fetch(baseURL + "users/biodata", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: user.uuid
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}

async function uploadProfilePicsFn() {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(baseURL + "users/profile/upload", {
    method: "POST",
    headers: {
      token: user.uuid
    },
    body: formData
  });
  return await res.json();
}
