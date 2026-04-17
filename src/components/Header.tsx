interface HeaderProps {
  setSearch: (value: string) => void;
  search: string;
}

const Header = ({ setSearch, search }: HeaderProps) => {
  //   const [search, setSearch] = useState("");

  return (
    <header className="h-24 flex items-center justify-between px-10 flex-shrink-0">
      <div className="relative w-full max-w-xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search any movies or tv shows"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full bg-[#1a1a1b] border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-green-500/50 transition-all outline-none placeholder:text-gray-600 font-medium"
        />
      </div>

      <nav className="flex items-center gap-8 ml-8">
        <ul className="flex items-center gap-8 text-sm font-bold tracking-wide">
          <li className="text-white cursor-pointer">Movies</li>
          <li className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            TV Shows
          </li>
          <li className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            Watchlist
          </li>
        </ul>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 cursor-pointer hover:border-green-500 transition-all">
          <img src="https://i.pravatar.cc/100" alt="Profile" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
