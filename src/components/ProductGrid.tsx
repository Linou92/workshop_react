
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
                                        products,
                                        onAddToCart,
                                    }: ProductGridProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const pages = [1, 2, 3, 12];

    if (products.length === 0) {
        return (
            <div className="mt-6 rounded-[1.25rem] border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
                <h2 className="text-lg font-bold text-slate-900">
                    No products found
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                    Try changing your search or filters to find products.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div
                id="product-grid"
                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>

            <nav
                aria-label="Pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-6"
            >
                <button
                    type="button"
                    onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={16} />
                    Previous
                </button>

                {pages.map((page, index) => (
                    <span key={page} className="contents">
            {index === 3 && (
                <span className="px-1 text-slate-400">…</span>
            )}
                        <button
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            aria-current={currentPage === page ? "page" : undefined}
                            className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold ${
                                currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:text-blue-600"
                            }`}
                        >
              {page}
            </button>
          </span>
                ))}

                <button
                    type="button"
                    onClick={() =>
                        setCurrentPage((page) => Math.min(12, page + 1))
                    }
                    disabled={currentPage === 12}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                    <ChevronRight size={16} />
                </button>
            </nav>
        </div>
    );
}
