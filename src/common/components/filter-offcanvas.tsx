'use client'

import { useEffect, useRef } from 'react';

interface FilterOffcanvasProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function FilterOffcanvas({ isOpen, onClose, children }: FilterOffcanvasProps) {

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);

            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>

            <div
                className="fixed inset-0 bg-gray-500 opacity-80 z-40 transition-opacity"
                onClick={onClose}
            />


            <div
                className={`fixed right-0 top-0 h-full w-full md:w-[400px] bg-gray-900 p-6 shadow-xl z-50 
                transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-100px)]">
                    {children}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
}