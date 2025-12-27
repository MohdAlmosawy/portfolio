import React from 'react';
import { CATEGORIES } from '../data';

const SearchPanel = ({ 
  selectedCategory, 
  onSelectCategory, 
  selectedAppFilter, 
  onSelectAppFilter,
  categoryCounts
}) => {
  // Only display categories that have at least one module
  const activeCategories = CATEGORIES.filter(category => (categoryCounts[category] || 0) > 0);

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200 overflow-y-auto hidden md:block pt-4 px-2">
      <section className="mb-6">
        <header className="px-3 py-2 flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-default">
           <i className="fa fa-folder text-[#714B67] mr-2 text-[14px]"></i>
           Apps
        </header>
        <ul className="space-y-0.5">
          {['All', 'Official Apps', 'Custom Modules'].map(filter => (
            <li key={filter}>
              <button 
                onClick={() => onSelectAppFilter(filter)}
                className={`w-full text-left px-4 py-1.5 text-[13px] border-l-4 transition-all ${selectedAppFilter === filter ? 'border-[#714B67] bg-[#E7E9ED] font-bold text-black' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <header className="px-3 py-2 flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-default">
           <i className="fa fa-folder text-[#714B67] mr-2 text-[14px]"></i>
           Categories
        </header>
        <ul className="space-y-0.5">
          <li>
            <button 
              onClick={() => onSelectCategory('All')}
              className={`w-full text-left px-4 py-1.5 text-[13px] border-l-4 transition-all ${selectedCategory === 'All' ? 'border-[#714B67] bg-[#E7E9ED] font-bold text-black' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
            >
              All
            </button>
          </li>
          {activeCategories.map(category => (
            <li key={category}>
              <button 
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-1.5 text-[13px] border-l-4 flex justify-between items-center transition-all ${selectedCategory === category ? 'border-[#714B67] bg-[#E7E9ED] font-bold text-black' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
              >
                <span>{category}</span>
                <span className="text-[11px] text-gray-400 font-bold ml-2">
                  {categoryCounts[category]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default SearchPanel;

