export default function Home() {
  return (
    <div className="width-100%">
      <div className="p-20 text-center">
        <div className="text-8xl flex-row flex m-auto w-fit space-x-2">
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 m-auto">
            SAFU
          </h1>
          <h1 className="font-extrabold text-7xl text-white m-auto">Wallet</h1>
        </div>
        <p className="text-base text-light italic" style={{ color: "#B9B9B9" }}>
          Powered by Aleph.im
        </p>
      </div>
    </div>
  );
}
