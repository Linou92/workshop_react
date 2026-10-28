
import { ChevronDown, RotateCcw, Tag } from "lucide-react";

interface SidebarProps {
    selectedCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
    maxPrice: number;
    onMaxPriceChange: (price: number) => void;
    inStockOnly: boolean;
    onInStockChange: (inStock: boolean) => void;
    onReset: () => void;
    saleOnly?: boolean;
    onSaleChange?: (onSale: boolean) => void;
}

const categories = [
    { name: "Outerwear", count: 42 },
    { name: "Footwear", count: 18 },
    { name: "Accessories", count: 64 },
];

export default function Sidebar({
                                    selectedCategories,
                                    onCategoriesChange,
                                    maxPrice,
                                    onMaxPriceChange,
                                    inStockOnly,
                                    onInStockChange,
                                    onReset,
                                    saleOnly = false,
                                    onSaleChange,
                                }: SidebarProps) {
    function toggleCategory(category: string) {
        if (selectedCategories.includes(category)) {
            onCategoriesChange(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            onCategoriesChange([...selectedCategories, category]);
        }
    }

    function selectAllCategories() {
        onCategoriesChange([]);
    }

    return (
        <aside className="w-full space-y-5 md:sticky md:top-24">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                        Filters
                    </h2>

                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
                    >
                        <RotateCcw size={13} />
                        Reset
                    </button>
                </div>

                <div className="space-y-6 p-5">
                    <section>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                Category
                            </h3>
                            <ChevronDown size={15} className="text-slate-400" />
                        </div>

                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.length === 0}
                                    onChange={selectAllCategories}
                                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                                />
                                <span
                                    className={
                                        selectedCategories.length === 0
                                            ? "font-semibold text-slate-900"
                                            : ""
                                    }
                                >
                  All Products
                </span>
                            </label>

                            {categories.map((category) => (
                                <label
                                    key={category.name}
                                    className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-600 transition-colors hover:text-slate-900"
                                >
                  <span className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    />
                    <span>{category.name}</span>
                  </span>

                                    <span className="text-xs text-slate-400">
                    {category.count}
                  </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                Price Range
                            </h3>

                            <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                ${Math.min(maxPrice, 1800)}
              </span>
                        </div>

                        <input
                            type="range"
                            min={0}
                            max={2200}
                            step={50}
                            value={Math.min(maxPrice, 2200)}
                            onChange={(event) =>
                                onMaxPriceChange(Number(event.target.value))
                            }
                            aria-label="Maximum price"
                            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
                        />

                        <div className="mt-2 flex justify-between text-xs text-slate-400">
                            <span>$0</span>
                            <span>$2,200</span>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-slate-800">
                            Availability
                        </h3>

                        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                checked={inStockOnly}
                                onChange={(event) => onInStockChange(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                            />
                            In Stock Only
                        </label>

                        {onSaleChange && (
                            <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={saleOnly}
                                    onChange={(event) => onSaleChange(event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                                />
                                On Sale
                            </label>
                        )}
                    </section>
                </div>
            </div>

            <div
                id="sale"
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-amber-400 p-5 text-white shadow-lg shadow-blue-900/10"
            >
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-amber-300/20" />

                <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
            <Tag size={12} />
            Limited offer
          </span>

                    <h3 className="mt-4 text-xl font-black tracking-tight">
                        Summer Sale
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                        Get ready for the season with exclusive offers on selected
                        styles.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            onCategoriesChange([]);
                            onMaxPriceChange(2200);
                            onSaleChange?.(true);
                        }}
                        className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-50"
                    >
                        Shop Sale
                    </button>
                </div>
            </div>
        </aside>
    );
}
