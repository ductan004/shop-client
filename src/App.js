import "./App.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <ScrollToTop />
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
