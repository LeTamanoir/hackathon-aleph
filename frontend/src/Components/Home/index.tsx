import AlephIcon from "../Header/AlephIcon";

export default function Home() {
  return (
    <div
      className="width-full flex flex-col gap-20 py-20 items-center justify-center"
      id="home-page"
    >
      <div className="flex flex-col gap-2">
        <div className="text-8xl flex-row flex m-auto w-fit gap-x-4">
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 m-auto">
            SAFU
          </h1>
          <h1 className="h-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 text-6xl text-white m-auto">
            {"{wallet}"}
          </h1>
        </div>
        <div className="text-base justify-center flex items-center text-light italic text-gray-400">
          <span>Powered by</span>
          <AlephIcon className="size-4 inline ml-1.5 mr-0.5" />
          <span>Aleph.im</span>
        </div>
      </div>

      <section className="max-w-lg">
        <h2 className="font-extrabold text-2xl text-[#0C79FD] mb-4">
          Welcome to Safu {"{Wallet}"}
        </h2>
        <p className="text-white">
          Experience the future of digital asset security with Safu {"{Wallet}"}
          , your gateway to cutting-edge, fully decentralized asset management.
          Our unique multi-signature wallet, powered by Aleph's innovative
          on-chain technology, sets a new standard in security and transparency,
          eliminating the need for centralized data storage and offering you
          unparalleled peace of mind.
        </p>
      </section>

      <section className="max-w-lg">
        <h2 className="font-extrabold text-2xl text-[#0C79FD] mb-4">
          The Safu Edge
        </h2>
        <p className="text-white">
          Safu {"{wallet}"} redefines your digital asset experience, blending
          top-tier security with user-friendly design. Embrace the confidence of
          managing your assets with our robust multi-signature approach,
          ensuring your investments are safe and distributed, catering to
          individuals, businesses, and institutions alike in the dynamic crypto
          landscape.
        </p>
      </section>

      <section className="max-w-lg">
        <h2 className="font-extrabold text-2xl text-[#0C79FD] mb-4">
          Empowered by Aleph
        </h2>
        <p className="text-white">
          At Safu {"{wallet}"}'s core is Aleph's revolutionary platform,
          enabling secure, transparent on-chain data handling. This integration
          fortifies our wallet's security and underlines our dedication to
          decentralization, providing you with an empowered, seamless asset
          management experience without sacrificing convenience or control.
        </p>
      </section>
    </div>
  );
}
