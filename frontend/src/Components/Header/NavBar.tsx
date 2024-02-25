import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import useAccount from "../../Hooks/useAccount";
import { config } from "../../wagmi";
import { LogoutIcon } from "../Icons";
import { useDisconnect } from "wagmi";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Transactions", href: "/transactions" },
  { name: "Apps", href: "/catalog" },
] as const;

export default function Navbar({
  selectedSafu,
  setSelectedSafu,
}: {
  selectedSafu: string;
  setSelectedSafu: (w: string) => void;
}) {
  const { account, availableSafuWallets } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <header
      className="w-full relative px-28 py-6 flex gap-y-3 items-center bg-darker border-b-2"
      style={{
        borderImageSlice: 2,
        borderImageSource:
          "radial-gradient(circle, #0C79FD 0%, #246ce0 40%, #131313ff 85%)",
      }}
    >
      <Logo />

      <nav className="gap-x-6 ml-auto">
        {LINKS.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              } relative px-4 py-2 transition-colors duration-200`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="relative ml-6">
        <div className="flex absolute items-center top-[-60%] text-gray-300 left-0 right-0">
          <span className="text-xs">{config.chains[0].name}</span>
          {account && (
            <>
              <a
                className="hover:underline ml-auto text-xs"
                target="_blank"
                rel="noreferrer"
                href={`${config.chains[0].blockExplorers.default.url}/address/${account.address}`}
              >
                {account.address.substring(0, 6)}...
                {account.address.substring(account.address.length - 4)}
              </a>
              <button onClick={() => disconnect()}>
                <LogoutIcon className="size-3.5 ml-1" />
              </button>
            </>
          )}
        </div>
        <select
          className="px-2 py-1 w-44 rounded-lg bg-dark-light text-white truncate focus:outline-none"
          value={selectedSafu}
          onChange={(e) => setSelectedSafu(e.target.value)}
        >
          <option value="none">Select a SAFU</option>
          {availableSafuWallets?.map((safu) => (
            <option key={safu} value={safu}>
              {safu.substring(0, 6)}...{safu.substring(safu.length - 4)}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
