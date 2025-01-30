import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const AnimatedSection = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left
                 hover:bg-gray-700/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-gray-700/30">
              <Icon size={20} className="text-gray-300" />
            </div>
          )}
          <span className="text-lg font-semibold text-gray-200">{title}</span>
        </div>
        <div className="text-gray-400 transition-transform duration-300">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 border-t border-gray-700/50">
          {children}
        </div>
      </div>
    </div>
  );
};