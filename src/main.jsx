import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./routes/app/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AllCountriesPage from "./routes/AllCountriesPage/AllCountriesPage";
import CountryPage, {
  loader as countryLoader,
} from "./routes/CountryPage/CountryPage";
import { store } from "./routes/app/store";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./reset.css";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AllCountriesPage />,
      },
      {
        path: "countries/:countryName",
        element: <CountryPage />,
        loader: countryLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
