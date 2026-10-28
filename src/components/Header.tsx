
import { useState } from "react";
import {
    Package,
    Search,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    Trash2,
} from "lucide-react";
import type { Product } from "../types/product";

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    cart: Product[];
    onRemoveCartItem: (index: number) => void;
}

export default function Header({
                                   searchQuery,
                                   onSearchChange,
                                   cart,
                                   onRemoveCartItem,
                               }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);


    const navLinks = [
        { label: "New Arrival", href: "#products" },
        { label: "Men", href: "#products" },
        { label: "Women", href: "#products" },
        { label: "Sale", href: "#sale" },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-blue-700/30 bg-blue-600 shadow-lg shadow-blue-900/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-3">
                    {/* Logo */}
                    <a
                        href="#"
                        className="flex shrink-0 items-center gap-2 font-bold tracking-tight text-white"
                    >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-md">
              <Package size={20} strokeWidth={2.5} />
            </span>

                        <span className="text-xl font-black uppercase tracking-tighter">
              LITE.SHOP
            </span>
                    </a>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-8 text-sm font-bold text-blue-100 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="relative transition-colors duration-200 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right-side controls */}
                    <div className="flex shrink-0 items-center gap-2">
                        {/* Live indicator */}
                        <div className="mr-4 hidden items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/30 px-3 py-1 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-200 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-100" />
              </span>

                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-50">
                Live
              </span>
                        </div>

                        {/* Search */}
                        <div className="relative hidden sm:block">
                            <input
                                id="search-input"
                                type="text"
                                value={searchQuery}
                                onChange={(event) => onSearchChange(event.target.value)}
                                placeholder="Search products..."
                                className="h-10 w-48 rounded-xl border border-blue-400/20 bg-blue-500/30 pl-10 pr-4 text-xs font-medium text-blue-50 outline-none transition-all duration-300 placeholder:text-blue-200/50 focus:w-64 focus:bg-blue-500/50"
                            />

                            <Search
                                size={16}
                                strokeWidth={2.5}
                                className="absolute left-3.5 top-3 text-blue-200"
                            />
                        </div>

                        {/* Cart */}

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsCartOpen((open) => !open)}
                                aria-label="Shopping cart"
                                aria-expanded={isCartOpen}
                                className="relative flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:bg-white/10"
                            >
                                <ShoppingBag size={21} />

                                {cart.length > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-slate-900">
        {cart.length}
      </span>
                                )}
                            </button>

                            {isCartOpen && (
                                <div className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
                                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                                        <div>
                                            <h2 className="font-bold">Your cart</h2>
                                            <p className="text-xs text-slate-500">
                                                {cart.length} {cart.length === 1 ? "item" : "items"}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setIsCartOpen(false)}
                                            aria-label="Close cart"
                                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {cart.length === 0 ? (
                                        <div className="px-5 py-10 text-center">
                                            <ShoppingBag
                                                size={32}
                                                className="mx-auto mb-3 text-slate-300"
                                            />
                                            <p className="font-semibold">Your cart is empty</p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Add a product to get started.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="max-h-80 overflow-y-auto p-4">
                                                <ul className="space-y-4">
                                                    {cart.map((product, index) => (
                                                        <li
                                                            key={`${product.id}-${index}`}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-16 w-14 rounded-lg bg-slate-100 object-cover"
                                                            />

                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-sm font-bold">
                                                                    {product.name}
                                                                </p>
                                                                <p className="mt-1 text-sm font-semibold text-blue-600">
                                                                    {product.price.toLocaleString("en-US")} kr
                                                                </p>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => onRemoveCartItem(index)}
                                                                aria-label={`Remove ${product.name} from cart`}
                                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                            >
                                                                <Trash2 size={17} />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="border-t border-slate-100 p-4">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <span className="text-sm text-slate-500">Subtotal</span>
                                                    <span className="text-lg font-black">
                {cart
                    .reduce((total, product) => total + product.price, 0)
                    .toLocaleString("en-US")}{" "}
                                                        kr
              </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setIsCartOpen(false)}
                                                    className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                                                >
                                                    Continue shopping
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>


                        {/* Account */}
                        <button
                            type="button"
                            aria-label="Account"
                            title="Account"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/30 text-blue-50 transition-all duration-200 hover:bg-blue-500/50 hover:text-white"
                        >
                            <UserRound size={20} strokeWidth={2} />
                        </button>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/30 text-blue-50 transition-all duration-200 hover:bg-blue-500/50 hover:text-white md:hidden"
                        >
                            {menuOpen ? (
                                <X size={22} strokeWidth={2.5} />
                            ) : (
                                <Menu size={24} strokeWidth={2.5} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                {menuOpen && (
                    <nav className="border-t border-blue-400/30 py-3 md:hidden">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-3 text-sm font-bold text-blue-50 transition-colors hover:bg-blue-500/50 hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Search is also available on small screens */}
                            <div className="relative mt-2 sm:hidden">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => onSearchChange(event.target.value)}
                                    placeholder="Search products..."
                                    className="h-10 w-full rounded-xl border border-blue-400/20 bg-blue-500/30 pl-10 pr-4 text-sm text-blue-50 outline-none placeholder:text-blue-200/70 focus:bg-blue-500/50"
                                />

                                <Search
                                    size={16}
                                    className="absolute left-3.5 top-3 text-blue-200"
                                />
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
