const table = document.querySelector(".ex");

// Append Sinppets
appendProfileSnippet();

const user = getFromDB();
console.log({ user });

(async () => {
  const res = await getExperiences();
  appendExperiences(res.data);
  addDelFunctionality();
})();

async function getExperiences() {
  const res = await fetch(baseURL + "users/experience", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: user.uuid
    }
  });
  return await res.json();
}

const addDelFunctionality = () => {
  const delBtns = document.querySelectorAll(".delete_btn");
  console.log({ delBtns });

  // Delete Btns
  delBtns.forEach((btn) => {
    btn.addEventListener("click", async ({ target }) => {
      const eId = target.getAttribute("id");
      const res = await deleteExperience(eId);
      appendExperiences(res.data);
      addDelFunctionality();
    });
  });
};

async function deleteExperience(eId) {
  const res = await fetch(baseURL + `users/experience/${eId}`, {
    method: "DELETE",
    headers: {
      token: user.uuid
    }
  });
  return await res.json();
}

const appendExperiences = (data) => {
  if (!data.length) {
    table.innerHTML = `<p style="text-align: center">No experience added</p>`;
    return;
  }

  const content = data.map((d) => {
    return ` 
      <div class="ex_item">
      <div class="">
      <h4>${d.name}</h4>
      <p>Year: ${d.started} - ${d.ended}</p>
      <h4>Position Held: ${d.position}</h4>
      <h4>Subject Taught: ${d.subject}</h4>
      </div>
      <button id=${d.id} class="_button delete_btn">Delete</button>
    </div>
      `;
  });

  table.innerHTML = content;
};
