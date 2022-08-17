const uploadBtn = document.querySelector("#upload_doc");
const fileinput = document.querySelector("#file");
const preview = document.querySelector(".preview_img");
const docTitle = document.querySelector(".selected_doc");
const select = document.querySelector("select");
const table = document.querySelector(".file_table");

let doc = "Select file to preview before uploading";
let file = {};

const user = getFromDB();
docTitle.textContent = doc;

(async () => {
  const res = await fetchFiles();
  appendFiles(res.data);
})();

select.addEventListener("change", ({ target }) => {
  doc = target.value;
});

fileinput.addEventListener("change", ({ target }) => {
  file = target.files[0];
  if (file.type != "application/pdf") {
    const img_url = URL.createObjectURL(file);
    console.log({ img_url });
    preview.src = img_url;
  }

  docTitle.textContent = doc;
});

uploadBtn.addEventListener("click", async () => {
  if (!doc) {
    alert("Document Type must be selected");
    fileinput.value = "";
    return;
  }

  if (!file.type) {
    alert("Please select a file to upload");
    return;
  }

  const res = await uploadFile();
  appendFiles(res.data);
});

async function uploadFile() {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", doc);

  const res = await fetch(baseURL + "users/files/upload", {
    method: "POST",
    headers: {
      token: user.uuid
    },
    body: formData
  });
  return await res.json();
}

async function fetchFiles() {
  const res = await fetch(baseURL + "users/files", {
    method: "GET",
    headers: {
      token: user.uuid
    }
  });
  return await res.json();
}

function appendFiles(data) {
  const content = data
    .map((r, index) => {
      console.log(r);
      return `    <div class="file_item">
<div class="li sn">${index + 1}</div>
<div class="li fid">${r.fileId}</div>
<div class="li fn">${r.name}</div>
<div class="li">Pending</div>
<button class="li delete_btn">Delete</button>
</div>`;
    })
    .join("");

  table.innerHTML = content;
}
