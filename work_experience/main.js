const table = document.querySelector(".ex");

// Append Sinppets
appendProfileSnippet();

const user = getFromDB();
console.log({ user });

(async () => {
  const res = await getExperiences();
  if (!res.data.length) return;
  const content = res.data.map((d) => {
    return `  <div class="ex_item">
        <h4>${d.name}</h4>
        <p>Year: ${d.started} - ${d.ended}</p>
        <h4>Position Held: ${d.position}</h4>
        <h4>Subject Taught: ${d.subject}</h4>
      </div>`;
  });

  table.innerHTML = content;
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
