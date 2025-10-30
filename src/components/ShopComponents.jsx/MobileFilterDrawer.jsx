import React from 'react';

const MobileFilterDrawer = ({ isOpen, onClose, children }) => {

  const drawerClasses = `
    fixed top-0 right-0 z-50 h-full w-full max-w-72 sm:max-w-80 transform transition-transform duration-300 ease-in-out lg:hidden
    bg-white shadow-2xl
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `;
  
  // Backdrop Classes 
  const backdropClasses = `
    fixed inset-0 z-40 bg-black transition-opacity duration-300 lg:hidden
    ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `;

  return (
    <>
      {/* Backdrop Overlay - Closes the drawer when clicked */}
      <div className={backdropClasses} onClick={onClose} aria-hidden="true" />
      
      {/* Drawer Panel (Slimmer Width applied here) */}
      <div className={drawerClasses}>
        <div className="flex flex-col h-full">
          
          {/* Header with Close Button (X) */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h3 className="text-xl font-bold text-gray-900">Refine Search</h3>
            <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition"
                aria-label="Close filters"
            >
              {/* Close Icon (X) */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Filter Content (Scrollable Area) */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>

          {/* Footer (Action Buttons) */}
          <div className="p-4 border-t flex flex-col space-y-2 flex-shrink-0 bg-white shadow-lg">
            <button 
              onClick={onClose} 
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150"
            >
              Apply Filters
            </button>
            <button 
              className="w-full text-sm font-medium text-red-600 hover:text-red-700 transition duration-150"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;