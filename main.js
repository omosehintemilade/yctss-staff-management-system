const saveToDB = (data) => {
  try {
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    alert("Couldn't connect to the Database now. Please try again");
  }
};

const saveToLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert("Couldn't connect to the Database now. Please try again");
  }
};

const getFromDB = () => {
  try {
    const data = localStorage.getItem("user");
    return JSON.parse(data);
  } catch (error) {
    alert("Couldn't connect to the Database now. Please try again");
  }
};

const baseURL = "http://localhost:8000/";

const disableBtn = (btnID, btntext) => {
  const btn = document.querySelector("#" + btnID);
  const btnStatus = btn.disabled;

  if (btnStatus) {
    btn.textContent = btntext;
  } else {
    btn.textContent = "Loading...";
  }
  btn.disabled = !btnStatus;
};

const showToast = (data) => {
  if (data.message) {
    alert(data.message);
  }
};
