import NavigationBar from "./components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import NowPage from "./pages/now/NowPage";
import HoursPage from "./pages/hours/HoursPage";
import LandingPageSearch from "./pages/search/LandingPageSearch";
const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route element={<LandingPageSearch />} path="/search/:ts" />
        <Route element={<LandingPage />} path="/" />
        <Route element={<NowPage />} path="/now" />
        <Route element={<HoursPage />} path="/hours" />
      </Routes>
    </>
  );
};

export default App;
