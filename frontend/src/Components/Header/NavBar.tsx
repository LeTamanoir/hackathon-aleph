import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import useAccount from "../../Hooks/useAccount";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Transactions", href: "/transactions" },
  { name: "Apps", href: "/catalog" },
] as const;

export default function Navbar({
  selectedSafu,
  setSelectedSafu,
}: {
  selectedSafu: `0x${string}` | undefined;
  setSelectedSafu: (w: `0x${string}` | undefined) => void;
}) {
  const { availableSafuWallets } = useAccount();

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

      <select
        className="ml-6 px-2 py-1 w-44 rounded-lg bg-dark-light text-white truncate focus:outline-none"
        value={selectedSafu ?? "none"}
        onChange={(e) =>
          e.target.value !== "nonce" &&
          setSelectedSafu(e.target.value as `0x${string}`)
        }
      >
        <option value="none">Select a SAFU</option>
        {availableSafuWallets?.map((safu) => (
          <option key={safu} value={safu}>
            {safu}
          </option>
        ))}
      </select>
    </header>
  );
}
