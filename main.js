const saveToDB = (data) => {
  try {
    localStorage.setItem("user", JSON.stringify(data));
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

const generateRandomCode = () => {
  // Default length is 5 Characters;
  const length = 5;
  let code = "";
  const chars = "7215369480";
  for (let i = length; i > 0; --i) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};
