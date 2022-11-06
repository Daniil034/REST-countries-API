import { Link } from "react-router-dom";
import { toggle } from "../../features/darkTheme/darkThemeSlice.js";
import { selectDarkTheme } from "../../features/darkTheme/darkThemeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { activateTheme } from "../../themes.js";
import DarkModeIcon from "../Icons/DarkModeIcon/DarkModeIcon.jsx";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector(selectDarkTheme);

  const handleClick = () => {
    dispatch(toggle());
  };

  useEffect(() => {
    if (darkTheme) activateTheme("dark");
    if (!darkTheme) activateTheme("light");
  }, [darkTheme]);

  return (
    <header className="header">
      <div className="wrapper header__flex">
        <Link to="/" preventScrollReset={true}>
          <h1 className="header__title">Where in the world?</h1>
        </Link>
        <div className="header__dark-mode" onClick={handleClick}>
          <div className="header__dark-mode-icon">
            <DarkModeIcon />
          </div>
          <p className="header__dark-mode-text">Dark Mode</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
