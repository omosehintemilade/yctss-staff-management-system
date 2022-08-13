const image = document.querySelector(".profile_img");

const user = getFromDB();
console.log({ user });

console.log({ image });

//   User is yet to provide their detailss
if (!user.surname) {
  window.location.replace("/profile/edit");
} else {
  // We have the user details
  if (user.profile_pics) {
    image.src = user.profile_pics;
  }

  for (const key in user) {
    const el = document.querySelector(`.${key}`);
    // if there's an element with that classname
    if (el) {
      el.textContent = user[key];
    }
  }
}
