import AppCatalog from "./Components/AppCatalog";
import Navbar from "./Components/Header/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./Components/Transactions";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import Footer from "./Components/Footer";

function App() {
  const [selectedSafu, setSelectedSafu] = useState<`0x${string}` | undefined>(
    () => (localStorage.getItem("selectedSafu") as `0x${string}`) ?? undefined
  );

  useEffect(() => {
    if (selectedSafu) localStorage.setItem("selectedSafu", selectedSafu);
  }, [selectedSafu]);

  return (
    <BrowserRouter>
      <Navbar selectedSafu={selectedSafu} setSelectedSafu={setSelectedSafu} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/catalog"
          element={<AppCatalog safuAddress={selectedSafu} />}
        />

        <Route
          path="/transactions"
          element={<Transactions safuAddress={selectedSafu} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
