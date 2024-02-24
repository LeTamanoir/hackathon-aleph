import DappCatalog from "./DappCatalog";

function App() {
  const multisigAddress = "0x41675c099f32341bf84bfc5382af534df5c7461a";
  // const account = useAccount();
  // const { connectors, connect, status, error } = useConnect();
  // const { disconnect } = useDisconnect();

  return (
    <>
      <DappCatalog multisigAddress={multisigAddress} />
    </>
  );
}

export default App;
