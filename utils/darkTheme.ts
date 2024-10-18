export const getTheme = () => {
  let theme = localStorage.getItem("theme");
  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    localStorage.setItem("theme", theme);
  }
  return theme;
};
