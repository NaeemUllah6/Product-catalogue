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
                ${PaginationButtonClassName ? PaginationButtonClassName : ''}
                px-4 py-2 text-sm font-medium rounded-md
                transition-all duration-200 ease-in-out
                ${active
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300'
                }
                ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-md transform hover:-translate-y-0.5'
                }
            `}
        >
            {children}
        </button>
    );
}
export default PaginationButton