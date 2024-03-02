import { Route, Routes } from "react-router-dom";
import PageOne from "./pages/PageOne";
import PageThree from "./pages/PageThree";
import PageTwo from "./pages/PageTwo";
import { CompanyProvider } from "./ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <CompanyProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page2" element={<PageTwo />} />
        <Route path="/page3" element={<PageThree />} />
      </Routes>
    </CompanyProvider>
  );
};

export default App;
