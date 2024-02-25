import AppCatalog from "./Components/AppCatalog";
import Navbar from "./Components/Header/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./Components/Transactions";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import ConnectWallet from "./Components/ConnectWallet";

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

        <Route Component={() => <ConnectWallet safuAddress={selectedSafu} />}>
          <Route
            path="/catalog"
            Component={() => <AppCatalog safuAddress={selectedSafu!} />}
          />

          <Route
            path="/transactions"
            Component={() => <Transactions safuAddress={selectedSafu!} />}
          />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
