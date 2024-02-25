import AlephIcon from "../Header/AlephIcon";

export default function Home() {
  return (
    <div
      className="width-full flex flex-col gap-10 items-center justify-center"
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

      <p className="text-white max-w-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        harum inventore omnis voluptatem iste nemo rem? Nam corporis, neque
        praesentium quisquam accusantium, numquam autem quis doloremque corrupti
        alias ducimus nulla blanditiis. Quibusdam quos sapiente ex aliquid odit
        vero vitae dolorum, facilis, officiis iusto commodi itaque, possimus
        amet quae corrupti doloribus dolor a. Nihil fugiat beatae dolore quis
        nesciunt odit earum dignissimos officiis velit id eligendi quidem quod,
        adipisci expedita obcaecati? Animi sunt ipsam ab alias, doloremque
        reprehenderit harum qui cum repellat itaque. Ipsum quod autem animi
        labore natus sint consectetur quia aliquam minus expedita, cumque
        impedit, quisquam eveniet blanditiis officia!
      </p>
    </div>
  );
}
