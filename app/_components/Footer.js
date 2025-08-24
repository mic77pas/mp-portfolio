export default function Footer() {
  return (
    <footer
      className="flex justify-start items-end w-full h-12 px-6 py-3 font-medium text-[#98b493] bg-[#202620]"
    >
      &copy; {new Date().getFullYear()} by Michael Pasyechnyk
    </footer>
  );
}
