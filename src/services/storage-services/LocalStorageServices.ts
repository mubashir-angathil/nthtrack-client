const theme = "Mode";
const localStorageServices = {
  /**
   * setTheme
   *
   * Sets the theme mode in the local storage.
   *
   * @param {object} mode - Theme mode to be set, either "dark" or "light".
   */
  setTheme: (mode: { mode: "dark" | "light" }) => {
    localStorage.setItem(theme, JSON.stringify(mode));
  },

  /**
   * getTheme
   *
   * Retrieves the theme mode from the local storage.
   *
   * @returns {object | null} Theme mode if found, null otherwise.
   */
  getTheme: (): { mode: "dark" | "light" } | null => {
    const mode = localStorage.getItem(theme);
    return mode ? JSON.parse(mode) : null;
  },
};
export default localStorageServices;
