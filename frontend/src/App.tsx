import NavigationBar from "./components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import NowPage from "./pages/now/NowPage";
const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<NowPage />} path="/now" />
      </Routes>
    </>
  );
};

export default App;
