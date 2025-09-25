'use client'
import { useState, useEffect } from "react";
import ProductCard, { Product } from "@/common/components/product-card";
import Heading from "@/common/components/heading";
import { MagnifyingGlass } from "@/common/assets/images/icons";
import PaginationButton from "@/common/components/pagination";
import FilterOffcanvas from "@/common/components/filter-offcanvas";

const CATEGORIES = ["All", "Clothing", "Accessories", "Footwear", "Watches"] as const;


interface SanityProduct {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    slug: string;
    category: string;
}

interface ApiResponse {
    products: SanityProduct[];
}

const ITEMS_PER_PAGE = 12;



export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortOrder, setSortOrder] = useState("default");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetch('/api/products');
                const json = await res.json() as ApiResponse;
                const products = (json.products || []).map((p: SanityProduct) => ({
                    id: p._id,
                    title: p.title,
                    price: p.price,
                    imageUrl: p.imageUrl,
                    slug: p.slug,
                    category: p.category,
                }));
                setAllProducts(products);
                setFilteredProducts(products);
            } catch {
                setAllProducts([]);
                setFilteredProducts([]);
            } finally { setLoading(false); }
        }
        load();

    }, []);

    useEffect(() => {
        let result = [...allProducts];

        if (searchQuery) {
            result = result.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(product => product.category === selectedCategory);
        }

        result = result.filter(product =>
            (product.price ?? 0) >= priceRange.min && (product.price ?? 0) <= priceRange.max
        );

        if (sortOrder === "highToLow") {
            result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        } else if (sortOrder === "lowToHigh") {
            result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        }

        setFilteredProducts(result);
    }, [searchQuery, selectedCategory, priceRange, sortOrder, allProducts]);

    return (
        <div className="container py-14">
            <header className="text-center mb-10">
                <Heading level={1} className="text-[22px] md:text-5xl font-clash font-semibold text-white">
                    Featured Products
                </Heading>
                <p className="mt-3 text-base md:text-lg text-white">
                    Discover our curated collection of premium products
                </p>
            </header>

            <div className="mb-8 space-y-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="relative flex flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlass />
                        </div>
                        <input
                            type="text"
                            id="search"
                            className="block w-full pl-10 pr-3 h-[42px] py-2 border text-gray-700 rounded-md leading-5 bg-white 
                                     placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 
                                     focus:ring-blue-500 sm:text-sm"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex group items-center gap-2 border hover:border-white cursor-pointer px-4 py-2 bg-white text-black hover:bg-black hover:text-white  rounded-md transition-colors whitespace-nowrap h-[42px]"
                    >
                        <svg className="w-5 h-5 fill-black group-hover:fill-white fill-stroke group-hover:stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Filters
                    </button>

                    <FilterOffcanvas
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                    >
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-white" htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    className="px-4 py-2 border w-full h-[42px] text-gray-700 rounded-md bg-white text-sm"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {CATEGORIES.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white" htmlFor="min-price">Min Value</label>
                                    <input
                                        type="number"
                                        id="min-price"
                                        className="w-full px-4 h-[42px] py-2 border bg-white text-gray-700 rounded-md"
                                        placeholder="Min €"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white" htmlFor="max-price">Max Value</label>
                                    <input
                                        type="number"
                                        id="max-price"
                                        className="w-full px-4 h-[42px] py-2 border bg-white text-gray-700 rounded-md"
                                        placeholder="Max €"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-white" htmlFor="sort">Sort By</label>
                                <select
                                    id="sort"
                                    className="px-4 py-2 h-[42px] w-full border text-gray-700 rounded-md bg-white text-sm"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="default">Sort by</option>
                                    <option value="lowToHigh">Price: Low to High</option>
                                    <option value="highToLow">Price: High to Low</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                    setPriceRange({ min: 0, max: 1000 });
                                    setSortOrder("default");
                                    setCurrentPage(1);
                                    setIsFilterOpen(false);
                                }}
                                className="w-full px-4 py-2 h-[42px] rounded-md text-black bg-white text-sm border hover:bg-neutral-50 mt-4"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </FilterOffcanvas>
                </div>
            </div>

            {loading ? (
                CATEGORIES.filter(c => c !== "All").map((cat) => (
                    <section key={cat} className="mb-10">
                        <div className="h-8 w-32 bg-gray-700 rounded-md mb-4 animate-pulse" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">

                                    <div className="aspect-[4/3] bg-gray-700" />
                                    <div className="p-4 space-y-3">

                                        <div className="h-4 bg-gray-700 rounded w-3/4" />

                                        <div className="h-6 bg-gray-700 rounded w-1/4" />

                                        <div className="h-4 bg-gray-700 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            ) : filteredProducts.length === 0 ? (
                <div className="py-16 text-center text-white">No data found</div>
            ) : (
                (CATEGORIES.filter(c => c !== "All")).map((cat) => {
                    const items = filteredProducts.filter(p => p.category === cat).slice(0, 10);
                    if (!items.length) return null;
                    return (
                        <section key={cat} className="mb-10">
                            <Heading level={2} className="text-white mb-4">{cat}</Heading>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {items.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )
                })
            )}


            {filteredProducts.length > 0 && (
                <div className="mt-12 flex flex-col items-center space-y-4">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <PaginationButton
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <span className="hidden sm:inline">Prev</span>
                            <span className="sm:hidden">←</span>
                        </PaginationButton>
                        {(() => {
                            const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
                            const pages = [];

                            if (currentPage > 2) {
                                pages.push(1);
                            }

                            if (currentPage > 3) {
                                pages.push('...');
                            }

                            for (let i = Math.max(1, currentPage - 1);
                                i <= Math.min(totalPages, currentPage + 1); i++) {
                                pages.push(i);
                            }

                            if (currentPage < totalPages - 2) {
                                pages.push('...');
                            }

                            if (currentPage < totalPages - 1 && totalPages > 1) {
                                pages.push(totalPages);
                            }

                            return pages.map((page, index) => {
                                if (page === '...') {
                                    return (
                                        <span key={`ellipsis-${index}`} className="px-1 sm:px-3 py-1 sm:py-2 text-gray-500">
                                            {page}
                                        </span>
                                    );
                                }

                                return (
                                    <PaginationButton
                                        key={`page-${page}`}
                                        active={currentPage === page}
                                        onClick={() => setCurrentPage(page as number)}
                                    >
                                        {page}
                                    </PaginationButton>
                                );
                            });
                        })()}
                        <PaginationButton
                            onClick={() => setCurrentPage(prev =>
                                Math.min(prev + 1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
                            )}
                            disabled={currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <span className="sm:hidden">→</span>
                        </PaginationButton>

                        <PaginationButton
                            PaginationButtonClassName='hidden'
                            onClick={() => setCurrentPage(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))}
                            disabled={currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                        >
                            Last
                        </PaginationButton>
                    </div>

                    <footer className="text-center text-gray-500 text-sm">
                        Showing {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                    </footer>
                </div>
            )}
        </div>
    );
}
