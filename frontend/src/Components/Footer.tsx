export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-2">
      <span className="text-white">&copy; {new Date().getFullYear()} Safu {"{wallet}"}</span>
    </footer>
  );
}
