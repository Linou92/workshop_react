
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onPageChange,
                                   }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Product pages"
            className="mt-8 flex items-center justify-center gap-2"
        >
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium ${
                            currentPage === page
                                ? "bg-indigo-600 text-white"
                                : "border border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronRight size={18} />
            </button>
        </nav>
    );
}
