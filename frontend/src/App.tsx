import AppCatalog from "./Components/AppCatalog";
import Navbar from "./Components/Header/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./Components/Transactions";
import Home from "./Components/Home";

function App() {
  const safuAddress = "0xA7a5575BC169d9E96aF32DdE565fa7e9E2e1d171";

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/catalog"
          element={<AppCatalog safuAddress={safuAddress} />}
        />

        <Route
          path="/transactions"
          element={<Transactions safuAddress={safuAddress} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
