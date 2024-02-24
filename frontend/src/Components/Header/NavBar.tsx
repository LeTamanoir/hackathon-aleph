import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Transactions", href: "/transactions" },
  { name: "Apps", href: "/catalog" },
] as const;

export default function Navbar() {
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
    </header>
  );
}
