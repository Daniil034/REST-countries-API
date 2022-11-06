import { useSelector } from "react-redux";
import { selectDarkTheme } from "../../../features/darkTheme/darkThemeSlice";
import "./DarkModeIcon.css";

const DarkModeIcon = () => {
  const darkTheme = useSelector(selectDarkTheme);

  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="green"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.84257 9.052C6.73486 9.052 4.21543 6.74226 4.21543 3.89457C4.21543 2.82024 4.57343 1.82526 5.18514 1C2.75229 1.75612 1 3.86498 1 6.35045C1 9.47079 3.75943 12 7.16286 12C9.87429 12 12.1757 10.3945 13 8.16362C12.1 8.72383 11.0129 9.052 9.84257 9.052Z"
        fill="white"
        stroke="#111517"
        className={darkTheme ? "dark-mode-icon--night" : ""}
      />
    </svg>
  );
};

export default DarkModeIcon;
