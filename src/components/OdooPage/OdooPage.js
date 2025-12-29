import React, { useState, useMemo } from 'react';
import PageTemplate from '../PageTemplate/PageTemplate';
import Navbar from './components/Navbar';
import ControlPanel from './components/ControlPanel';
import SearchPanel from './components/SearchPanel';
import ModuleCard from './components/ModuleCard';
import { MOCK_MODULES } from './data';
import './OdooPage.css';

const OdooPage = () => {
  const [modules, setModules] = useState(MOCK_MODULES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAppFilter, setSelectedAppFilter] = useState('All');

  const filteredModules = useMemo(() => {
    return modules.filter(m => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.shortdesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
      
      let matchesAppFilter = true;
      if (selectedAppFilter === 'Official Apps') {
        matchesAppFilter = m.module_type === 'official';
      } else if (selectedAppFilter === 'Custom Modules') {
        matchesAppFilter = m.module_type !== 'official';
      }

      return matchesSearch && matchesCategory && matchesAppFilter;
    });
  }, [modules, searchQuery, selectedCategory, selectedAppFilter]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    modules.forEach(m => {
      counts[m.category] = (counts[m.category] || 0) + 1;
    });
    return counts;
  }, [modules]);

  const handleModuleAction = (id, newState) => {
    setModules(prev => prev.map(m => 
      m.id === id ? { ...m, state: newState } : m
    ));

    // Simulate async operation for transitions
    if (newState === 'to install') {
      setTimeout(() => {
        setModules(prev => prev.map(m => m.id === id ? { ...m, state: 'installed' } : m));
      }, 1500);
    } else if (newState === 'to upgrade') {
      setTimeout(() => {
        setModules(prev => prev.map(m => m.id === id ? { ...m, state: 'installed' } : m));
      }, 1200);
    } else if (newState === 'to remove') {
      setTimeout(() => {
        setModules(prev => prev.map(m => m.id === id ? { ...m, state: 'uninstalled' } : m));
      }, 1000);
    }
  };

  return (
    <PageTemplate>
      <div className="flex flex-col h-full bg-[#F1F2F5] odoo-page-container">
        <Navbar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ControlPanel 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            totalModules={filteredModules.length} 
          />
          
          <div className="flex flex-1 overflow-hidden">
            <SearchPanel 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedAppFilter={selectedAppFilter}
              onSelectAppFilter={setSelectedAppFilter}
              categoryCounts={categoryCounts}
            />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-[1400px] mx-auto">
                {filteredModules.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {filteredModules.map(module => (
                      <ModuleCard 
                        key={module.id} 
                        module={module} 
                        onAction={handleModuleAction}
                      />
                    ))}
                    {/* Ghosts for Odoo layout feel */}
                    <div className="hidden 2xl:block opacity-0 h-0"></div>
                    <div className="hidden 2xl:block opacity-0 h-0"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                     <i className="fa fa-frown-o text-5xl opacity-20 mb-4"></i>
                     <p className="text-lg font-medium">No modules found matching your search.</p>
                     <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                        setSelectedAppFilter('All');
                      }}
                      className="mt-4 text-[#00A09D] hover:underline text-sm font-medium"
                     >
                        Clear all filters
                     </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default OdooPage;

