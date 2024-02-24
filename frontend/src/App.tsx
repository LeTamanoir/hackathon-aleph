import DappCatalog from "./Components/DappCatalog";
import Navbar from "./Components/Header/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./Components/Transactions";

function App() {
  const multisigAddress = "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093e";

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<div>Home</div>} />

        <Route
          path="/catalog"
          Component={() => <DappCatalog multisigAddress={multisigAddress} />}
        />

        <Route
          path="/transactions"
          Component={() => <Transactions multisigAddress={multisigAddress} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
