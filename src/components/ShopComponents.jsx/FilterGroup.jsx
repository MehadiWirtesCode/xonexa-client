import {useState } from 'react';
import { AllProductDataContext } from '../allProductDataConext/allProductConext';

// Main Filter Group Container
const FilterGroup = ({ title, children}) => {
 
  return (
    <div className="py-4 border-b border-gray-200">
      <h4 className="text-md font-semibold text-gray-700 mb-3">{title}</h4>
      {children}
    </div>
  );
};

//  New Nested/Collapsible Component 
export const NestedFilterGroup = ({ title, children, isOpenInitially = false }) => {
    const [isOpen, setIsOpen] = useState(isOpenInitially);

    return (
        <div className="mb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-sm font-medium text-gray-800 hover:text-indigo-600 transition duration-150 p-1 -ml-1"
                aria-expanded={isOpen}
            >
                {title}
                {/* Chevron Icon */}
                <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : 'rotate-0 text-gray-400'}`}
                    viewBox="0 0 20 20" fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            {/* Collapse Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
};


export const CheckboxOption = ({ id, label, count, selectedCategories, onChange }) => {
  const isChecked = selectedCategories.includes(label);

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(label, e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
        {label}
      </label>
      <span className="ml-auto text-xs text-gray-400">({count})</span>
    </div>
  );
};

export default FilterGroup;

