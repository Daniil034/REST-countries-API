const themes = {
  light: {
    "--background-color": "var(--very-light-gray)",
    "--text-color": "var(--very-dark-blue-text)",
    "--elements-color": "var(--white)",
    "--input-placeholder": "var(--dark-gray)",
  },
  dark: {
    "--background-color": "var(--very-dark-blue-background)",
    "--text-color": "var(--white)",
    "--elements-color": "var(--dark-blue)",
    "--input-placeholder": "var(--white)",
  },
};

export const activateTheme = (theme) => {
  for (let prop in themes[theme]) {
    document
      .querySelector(":root")
      .style.setProperty(prop, themes[theme][prop]);
  }
};
