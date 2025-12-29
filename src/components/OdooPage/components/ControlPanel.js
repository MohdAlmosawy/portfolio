import React from 'react';

const ControlPanel = ({ searchQuery, setSearchQuery, totalModules }) => {
  return (
    <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center space-x-2">
        <h4 className="text-xl font-medium text-[#212529]">Apps</h4>
        <i className="fa fa-cog text-gray-400 text-sm cursor-pointer hover:text-gray-600"></i>
      </div>

      <div className="flex-grow max-w-xl mx-4 flex items-center">
        <div className="relative flex-grow flex items-center border border-gray-300 rounded-sm px-2 py-1 bg-white focus-within:border-[#00A09D]">
          <i className="fa fa-search text-gray-400 mr-2 text-sm"></i>
          <div className="flex items-center bg-[#00A09D] text-white px-2 py-0.5 rounded-sm text-[11px] font-medium mr-2 whitespace-nowrap">
            Apps <span className="ml-2 cursor-pointer opacity-70 hover:opacity-100">×</span>
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full text-sm outline-none bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-2 border-l border-gray-200 text-gray-400 hover:text-gray-600">
             <i className="fa fa-caret-down"></i>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-gray-600">
          <span>1-{totalModules} / {totalModules}</span>
          <div className="ml-3 flex border border-gray-300 rounded-sm">
            <button className="px-2 py-1 border-r border-gray-300 bg-gray-50 text-gray-400" disabled>
              <i className="fa fa-chevron-left"></i>
            </button>
            <button className="px-2 py-1 bg-gray-50 text-gray-400" disabled>
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="flex bg-white border border-gray-300 rounded-sm">
          <button className="px-2.5 py-1.5 bg-[#E7E9ED] border-r border-gray-300 text-[#714B67]">
             <i className="fa fa-th-large"></i>
          </button>
          <button className="px-2.5 py-1.5 hover:bg-gray-50 text-gray-400">
             <i className="fa fa-list"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

