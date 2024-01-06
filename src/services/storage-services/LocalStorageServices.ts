const theme = "Mode";
const localStorageServices = {
  // Set theme
  setTheme: (mode: { mode: "dark" | "light" }) => {
    return localStorage.setItem(theme, JSON.stringify(mode));
  },
  //   Get theme
  getTheme: () => {
    const mode = localStorage.getItem(theme);
    return mode ? JSON.parse(mode) : null;
  },
};
export default localStorageServices;
