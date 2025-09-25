function PaginationButton({ children, active, disabled, onClick, PaginationButtonClassName = '' }: {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    PaginationButtonClassName?: string;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                cursor-pointer
                ${PaginationButtonClassName ? PaginationButtonClassName : ''}
                px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md
                min-w-[32px] sm:min-w-[40px] flex items-center justify-center
                transition-all duration-200 ease-in-out
                ${active
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                }
                ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-md transform '
                }
            `}
        >
            {children}
        </button>
    );
}
export default PaginationButton