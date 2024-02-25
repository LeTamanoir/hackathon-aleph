import { Link } from "react-router-dom";
import AlephIcon from "./AlephIcon";

export default function Logo() {
  return (
    <div className="flex flex-col gap-1.5 text-white">
      <Link to="/">
        <h1 className="text-2xl">SAFU {"{wallet}"}</h1>
      </Link>

      <div className="flex gap-1 items-center">
        <span className="text-xs">powered by</span>
        <AlephIcon className="size-3.5" />
        <a
          href="https://aleph.im"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold"
        >
          Aleph.im
        </a>
      </div>
    </div>
  );
}
