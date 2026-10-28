
import {useMemo, useState } from "react";
import { ArrowDownWideNarrow } from "lucide-react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

import { products } from "./data/products";
import type { Product } from "./types/product";

type SortOption = "recommended" | "price-low" | "price-high" | "rating";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.badge.toLowerCase().includes(query) ||
          product.availability.toLowerCase().includes(query);

      const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);

      const matchesPrice = product.price <= maxPrice;
      const matchesAvailability = !inStockOnly || product.inStock;

      const isOnSale =
          product.originalPrice !== undefined &&
          product.originalPrice > product.price;

      const matchesSale = !saleOnly || isOnSale;

      return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesAvailability &&
          matchesSale
      );
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);

      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);

      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);

      default:
        return filtered;
    }
  }, [
    searchQuery,
    selectedCategories,
    maxPrice,
    inStockOnly,
    saleOnly,
    sortBy,
  ]);

  function resetFilters() {
    setSelectedCategories([]);
    setMaxPrice(2200);
    setInStockOnly(false);
    setSaleOnly(false);
    setSearchQuery("");
    setSortBy("recommended");
  }

  function handleAddToCart(product: Product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  function handleRemoveCartItem(indexToRemove: number) {
    setCart((currentCart) =>
        currentCart.filter((_, index) => index !== indexToRemove)
    );
  }

  return (
      <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
        <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            cart={cart}
            onRemoveCartItem={handleRemoveCartItem}
        />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <section id="products">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  Curated for you
                </p>

                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Recommended for you
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Discover your next favourite from our collection.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">
                  {filteredProducts.length}
                </span>{" "}
                  of {products.length} products
                </p>

                <label className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm">
                  <ArrowDownWideNarrow
                      size={16}
                      className="text-slate-500"
                  />

                  <span className="sr-only">Sort products</span>

                  <select
                      value={sortBy}
                      onChange={(event) =>
                          setSortBy(event.target.value as SortOption)
                      }
                      className="max-w-36 cursor-pointer bg-transparent text-xs font-semibold text-slate-700 outline-none sm:max-w-none"
                      aria-label="Sort products"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
              <Sidebar
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                  inStockOnly={inStockOnly}
                  onInStockChange={setInStockOnly}
                  onReset={resetFilters}
                  saleOnly={saleOnly}
                  onSaleChange={setSaleOnly}
              />

              <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
              />
            </div>
          </section>
        </main>

        <Newsletter />
        <Footer />
      </div>
  );
}

export default App;
