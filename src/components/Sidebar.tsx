const Sidebar = () => {
  return (
    <aside className="w-56 flex-shrink-0 bg-[#0f0f10] p-8 hidden lg:flex flex-col gap-10 border-r border-gray-800/50">
      <div className="flex items-center gap-3 text-green-500">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-green-500"
        >
          <path d="M4 4h10a2 2 0 012 2v4.5l4-3v9l-4-3V18a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
          <circle cx="7" cy="9" r="1" fill="#0f0f10" />
          <circle cx="11" cy="9" r="1" fill="#0f0f10" />
        </svg>
        <span className="font-bold text-xl tracking-tight text-white uppercase">
          Movie<br></br>
          Fetcher
        </span>
      </div>

      <nav className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Genre
          </h3>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li className="text-green-500 cursor-pointer">Action</li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Horror
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Comedy
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Adventure
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Drama
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Sci-Fi
            </li>
            <li className="text-gray-600 text-xs cursor-pointer italic mt-1">
              More ...
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Language
          </h3>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">
              English
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Hindi
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Tamil
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Telugu
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Marathi
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Punjabi
            </li>
            <li className="text-gray-600 text-xs cursor-pointer italic mt-1">
              More ...
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
