import React, { useState, useRef, useEffect } from 'react';

// Teal cube icon provided by the user
const DEFAULT_ICON = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" stroke="#4DB6AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 35L50 55M85 35L50 55M50 85V55" stroke="#4DB6AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 65L50 45L85 65" stroke="#4DB6AC" stroke-width="1" stroke-dasharray="2 2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M50 15V45" stroke="#4DB6AC" stroke-width="1" stroke-dasharray="2 2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`)}`;

const ModuleCard = ({ module, onAction }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const isInstalled = module.state === 'installed';
  const isUninstalled = module.state === 'uninstalled';
  const isUninstallable = module.state === 'uninstallable';

  // Use provided icon or the default cube icon
  const iconSrc = module.icon && module.icon !== '' ? module.icon : DEFAULT_ICON;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleStateChange = (e, state) => {
    e.stopPropagation();
    onAction(module.id, state);
  };

  return (
    <article className="o_kanban_record bg-white border border-gray-200 rounded-sm shadow-sm flex flex-row p-3 hover:shadow-md h-[125px] relative group cursor-default">
      {/* ASIDE: Icon and Flag */}
      <aside className="mr-3 flex-shrink-0 flex flex-col items-center">
        <div className="w-[50px] h-[50px] bg-white rounded-md overflow-hidden flex items-center justify-center border border-gray-100">
          <img 
            src={iconSrc} 
            alt="Icon" 
            className="w-full h-full object-contain p-1"
            onError={(e) => (e.currentTarget.src = DEFAULT_ICON)}
          />
        </div>
        {module.icon_flag && (
           <span className="text-[10px] mt-1 bg-yellow-100 text-yellow-800 px-1 rounded uppercase font-bold">
             {module.icon_flag}
           </span>
        )}
      </aside>

      {/* MAIN: Info and Footer */}
      <main className="flex-grow flex flex-col justify-between overflow-hidden pr-2">
        <div className="overflow-hidden">
          <h2 className="text-[15px] font-bold text-[#212529] truncate leading-tight mb-0.5" title={module.shortdesc}>
            {module.shortdesc}
          </h2>
          {/* Use line-clamp-2 to ensure description stays under two lines */}
          <small className="text-[12px] text-gray-500 line-clamp-2 leading-snug block mb-0.5 h-[34px] overflow-hidden" title={module.summary}>
            {module.summary}
          </small>
          <code className="text-[10px] text-gray-400 font-mono">
            {module.name}
          </code>
        </div>

        {/* FOOTER: Conditional Buttons */}
        <footer className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Activate / Install Buttons */}
            {isUninstalled && !module.to_buy && (
              <button 
                onClick={(e) => handleStateChange(e, 'to install')}
                className="px-2 py-0.5 bg-[#00A09D] hover:bg-[#008a87] text-white text-[11px] font-bold rounded-sm uppercase"
              >
                Activate
              </button>
            )}

            {/* Installed State */}
            {isInstalled && (
              <div className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-tight">
                <i className="fa fa-check-circle text-green-500 mr-1"></i>
                Installed
              </div>
            )}

            {/* Upgrade Button */}
            {(isUninstalled || isUninstallable) && module.to_buy && (
              <a 
                href="https://odoo.com/pricing" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2 py-0.5 bg-[#017E84] hover:bg-[#016469] text-white text-[11px] font-bold rounded-sm uppercase"
              >
                Upgrade
              </a>
            )}

            {/* Delivery Methods (from XPath) */}
            {isInstalled && module.name.includes('delivery') && (
               <button className="px-2 py-0.5 bg-[#00A09D] text-white text-[11px] font-bold rounded-sm uppercase ml-1">
                 Delivery Methods
               </button>
            )}

            {/* Status indicators for long processes */}
            {module.state === 'to remove' && <button disabled className="px-2 py-0.5 bg-gray-200 text-gray-500 text-[11px] font-bold rounded-sm uppercase">Removing</button>}
            {module.state === 'to upgrade' && <button disabled className="px-2 py-0.5 bg-gray-200 text-gray-500 text-[11px] font-bold rounded-sm uppercase">Upgrading</button>}
            {module.state === 'to install' && <button disabled className="px-2 py-0.5 bg-gray-200 text-gray-500 text-[11px] font-bold rounded-sm uppercase">Installing</button>}
          </div>

          <div className="flex items-center">
             {module.website ? (
               <a 
                 href={module.website} 
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()}
                 className="text-[11px] font-bold text-gray-500 hover:text-gray-800 uppercase tracking-tight border border-gray-300 px-2 py-0.5 rounded-sm bg-gray-50"
               >
                 Learn More
               </a>
             ) : (
               <button className="text-[11px] font-bold text-gray-500 hover:text-gray-800 uppercase tracking-tight border border-gray-300 px-2 py-0.5 rounded-sm bg-gray-50">
                 Module Info
               </button>
             )}
          </div>
        </footer>
      </main>

      {/* DROPDOWN MENU */}
      <div className="absolute top-1 right-1" ref={menuRef}>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          className="px-1.5 py-0.5 text-gray-300 hover:text-gray-600 transition-opacity opacity-0 group-hover:opacity-100"
        >
           <i className="fa fa-ellipsis-v"></i>
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-sm z-20 py-1">
            <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">Module Info</button>
            {module.website && (
              <a 
                href={module.website} 
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                Learn More
              </a>
            )}
            {isInstalled && (
              <>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={(e) => handleStateChange(e, 'to upgrade')}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  Upgrade
                </button>
                <button 
                  onClick={(e) => handleStateChange(e, 'to remove')}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-gray-100"
                >
                  Uninstall…
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ModuleCard;

