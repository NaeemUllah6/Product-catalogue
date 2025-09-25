interface FilterSectionProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: { min: number; max: number };
    onPriceRangeChange: (range: { min: number; max: number }) => void;
    sortOrder: string;
    onSortChange: (sort: string) => void;
    className?: string;
}

export default function FilterSection({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    sortOrder,
    onSortChange,
    className = ''
}: FilterSectionProps) {
    return (
        <div className={`flex flex-wrap gap-4 justify-center items-center ${className}`}>
            {/* Category Filter */}
            <select
                className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            {/* Price Range Filters */}
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    className="w-24 px-2 py-2 border border-gray-300 rounded-md"
                    placeholder="Min €"
                    value={priceRange.min}
                    onChange={(e) => onPriceRangeChange({ ...priceRange, min: Number(e.target.value) })}
                />
                <span className="text-gray-400">-</span>
                <input
                    type="number"
                    className="w-24 px-2 py-2 border border-gray-300 rounded-md"
                    placeholder="Max €"
                    value={priceRange.max}
                    onChange={(e) => onPriceRangeChange({ ...priceRange, max: Number(e.target.value) })}
                />
            </div>

            {/* Sort Options */}
            <select
                className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="default">Sort by</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>
        </div>
    );
}