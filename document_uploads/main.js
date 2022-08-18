const uploadBtn = document.querySelector("#upload_doc");
const fileinput = document.querySelector("#file");
const preview = document.querySelector(".preview_img");
const docTitle = document.querySelector(".selected_doc");
const select = document.querySelector("select");
const table = document.querySelector(".file_table");
const uploadCount = document.querySelector(".uploadCount");

let doc = "Select file to preview before uploading";
let file = {};

const user = getFromDB();
docTitle.textContent = doc;

(async () => {
  const res = await fetchFiles();
  uploadCount.textContent = res.data.length;
  appendFiles(res.data);
  addDelFunctionality();
})();

select.addEventListener("change", ({ target }) => {
  doc = target.value;
});

fileinput.addEventListener("change", ({ target }) => {
  file = target.files[0];
  if (file.type != "application/pdf") {
    const img_url = URL.createObjectURL(file);
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
  uploadCount.textContent = res.data.length;
  appendFiles(res.data);
  addDelFunctionality();
  // Reset system
  fileinput.value = "";
  select.value = "";
  preview.src = "../assets/placeholder.jpg";
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
      return `<div class="file_item">
<div class="li sn">${index + 1}</div>
<div class="li fid">${r.fileId}</div>
<div class="li fn">${r.name}</div>
<div class="li">Pending</div>
<button id=${r.fileId} class="li delete_btn">Delete</button>
</div>`;
    })
    .join("");

  table.innerHTML = content;
}

const addDelFunctionality = () => {
  const delBtns = document.querySelectorAll(".delete_btn");

  console.log({ delBtns });
  // Delete Btns
  delBtns.forEach((btn) => {
    btn.addEventListener("click", async ({ target }) => {
      const fId = target.getAttribute("id");
      const res = await deleteFile(fId);
      appendFiles(res.data);
    });
  });
};

async function deleteFile(fId) {
  const res = await fetch(baseURL + `users/files/${fId}`, {
    method: "DELETE",
    headers: {
      token: user.uuid
    }
  });
  return await res.json();
}
