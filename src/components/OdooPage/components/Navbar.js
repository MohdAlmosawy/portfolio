import React from 'react';

// Using the exact photo provided for the Mitchell Admin user profile
const USER_AVATAR = "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=128&h=128";

const Navbar = () => {
  return (
    <nav className="flex items-center bg-[#714B67] text-white h-[46px] px-2 flex-shrink-0 z-50">
      <div className="flex items-center h-full cursor-pointer hover:bg-white/10 px-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
          <rect width="3" height="3" x="0" y="0"></rect>
          <rect width="3" height="3" x="5" y="0"></rect>
          <rect width="3" height="3" x="10" y="0"></rect>
          <rect width="3" height="3" x="0" y="5"></rect>
          <rect width="3" height="3" x="5" y="5"></rect>
          <rect width="3" height="3" x="10" y="5"></rect>
          <rect width="3" height="3" x="0" y="10"></rect>
          <rect width="3" height="3" x="5" y="10"></rect>
          <rect width="3" height="3" x="10" y="10"></rect>
        </svg>
        <span className="ml-3 font-semibold text-[15px]">Apps</span>
      </div>
      
      <div className="flex items-center ml-2 space-x-1 h-full">
        {['Apps', 'Update Apps List', 'Apply Scheduled Upgrades', 'Import Module'].map((item, idx) => (
          <div key={item} className={`px-3 py-1 text-sm h-full flex items-center cursor-pointer hover:bg-white/10 ${idx === 0 ? 'bg-white/10 font-medium' : ''}`}>
            {item}
          </div>
        ))}
      </div>

      <div className="flex items-center ml-auto h-full space-x-3 pr-2">
        <i className="fa fa-bug opacity-70 hover:opacity-100 cursor-pointer"></i>
        <i className="fa fa-comments opacity-70 hover:opacity-100 cursor-pointer"></i>
        <i className="fa fa-clock-o opacity-70 hover:opacity-100 cursor-pointer"></i>
        <div className="flex items-center space-x-2 border-l border-white/20 pl-3 h-full px-2 hover:bg-white/10 cursor-pointer">
          <span className="text-xs font-medium">My Company (San Francisco)</span>
        </div>
        <div className="flex items-center space-x-2 h-full px-2 hover:bg-white/10 cursor-pointer">
          <img src={USER_AVATAR} className="w-6 h-6 rounded object-cover border border-white/20" alt="avatar" />
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold">Mitchell Admin</span>
            <span className="text-[9px] opacity-70">96550073-master-all</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

