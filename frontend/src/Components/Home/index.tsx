import { useState } from "react";

export default function Home() {
  const [safe, setSafe] = useState<`0x${string}` | null>(null);
  console.log({ safe });

  return (
    <div className="width-100%">
      <div className="p-20 text-center space-y-10">
        <div className="space-y-2">
          <div className="text-8xl flex-row flex m-auto w-fit space-x-4">
            <h1 className="font-extrabold text-transparent select-none bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 m-auto">
              SAFU
            </h1>
            <h1 className="h-16 text-transparent select-none bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 text-6xl text-white m-auto">
              {"{wallet}"}
            </h1>
          </div>
          <p className="text-base text-light select-none italic text-gray-400">
            Powered by Aleph.im
          </p>
        </div>
        <div className="text-gray-300 space-y-4">
          {safe && (
            <button className="w-fit m-auto hover:scale-110 duration-200">
              <p className="text-xl" onClick={() => setSafe(null)}>
                Change Safe
              </p>
            </button>
          )}
          {!safe && (
            <p className="text-xl inline-block align-top px-1">
              Please select a safe :
            </p>
          )}
          <div className="flex justify-center flex-col space-y-2 w-1/3 m-auto duration-200">
            {[
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093e",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093f",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093g",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093h",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093i",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093j",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093k",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093l",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093m",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093n",
              "0x4EF0ef5aC60ae6117AF59A5ea1F90Ad2e6ce093o",
            ]
              .filter((address) => !safe || address === safe)
              .map((address) => (
                <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-3 text-slate-300  border-black outline-1 rounded-xl bg-slate-500 hover:cursor-pointer hover:bg-slate-600 hover:scale-105 duration-500">
                  <p
                    onClick={() => setSafe(address as `0x${string}`)}
                    className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                  >
                    {address}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
