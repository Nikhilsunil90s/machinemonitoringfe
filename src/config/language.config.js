const user = JSON.parse(localStorage.getItem("profile"));
const language = user ? user.language : "english";
export const langDir = "ltr";

export default language;
