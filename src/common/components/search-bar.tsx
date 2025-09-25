import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export default function SearchBar({ value, onChange, className = '' }: SearchBarProps) {
    return (
        <div className={`relative max-w-md mx-auto ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                         placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 
                         focus:ring-blue-500 sm:text-sm"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}