import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const AnimatedSection = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className={`transition-[height,opacity] duration-300 ease-in-out ${
        isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
      }`}>
        <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
