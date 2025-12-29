import { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 max-w-lg w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#92b7c9] group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-[#233c48] text-white placeholder-[#92b7c9] focus:ring-2 focus:ring-primary focus:bg-[#1e293b] transition-all sm:text-sm"
          placeholder="Search city..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
