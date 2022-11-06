import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import { loadCountries } from "../../features/countries/countriesSlice";
import { updateRegions } from "../../features/regions/regionsSlice";
import Header from "../../components/Header/Header";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const promise = dispatch(
      loadCountries({ countryName: null, countryRegion: null })
    );
    promise.unwrap().then(({ regions }) => {
      if (regions) {
        dispatch(updateRegions(regions));
      }
    });

    return () => {
      promise.abort();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <div
        className={navigation.state === "loading" ? "app app--loading" : "app"}
      >
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
