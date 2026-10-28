
import { Eye, Heart, Plus, Star } from "lucide-react";
import type { Product } from "../types/product";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

function getBadgeStyles(badge: string): string {
    switch (badge.toLowerCase()) {
        case "discount":
        case "hot deal":
            return "border-rose-100/50 bg-rose-500/10 text-rose-600";
        case "limited":
        case "new arrival":
            return "border-amber-100/50 bg-amber-500/10 text-amber-600";
        case "popular":
            return "border-blue-100/50 bg-blue-500/10 text-blue-600";
        case "sold out":
            return "border-slate-200/50 bg-slate-900/60 text-white";
        default:
            return "border-slate-200/70 bg-white/80 text-slate-700";
    }
}

export default function ProductCard({
                                        product,
                                        onAddToCart,
                                    }: ProductCardProps) {
    const isSoldOut = !product.inStock;

    return (
        <article className="group rounded-[1.25rem] border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]">
            <div
                className={`relative overflow-hidden rounded-2xl bg-slate-100 ${
                    isSoldOut
                        ? "opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                        : ""
                }`}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                    className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                        isSoldOut
                            ? "bg-slate-900/20 opacity-0 group-hover:opacity-100"
                            : "bg-blue-600/10 opacity-0 group-hover:opacity-100"
                    }`}
                >
                    <button
                        type="button"
                        aria-label={`Quick view ${product.name}`}
                        title="Quick View"
                        disabled={isSoldOut}
                        className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-all duration-500 hover:bg-blue-600 hover:text-white group-hover:translate-y-0 disabled:cursor-not-allowed disabled:bg-white/80 disabled:text-slate-400"
                    >
                        <Eye size={20} />
                    </button>

                    <button
                        type="button"
                        aria-label={`Add ${product.name} to cart`}
                        title="Add to cart"
                        disabled={isSoldOut}
                        onClick={() => onAddToCart(product)}
                        className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-all delay-75 duration-500 hover:bg-blue-600 hover:text-white group-hover:translate-y-0 disabled:cursor-not-allowed disabled:bg-white/80 disabled:text-slate-400"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <span
                    className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-[11px] font-bold backdrop-blur-md ${getBadgeStyles(
                        product.badge
                    )}`}
                >
          {product.badge}
        </span>

                <button
                    type="button"
                    aria-label={`Add ${product.name} to favorites`}
                    title="Favorite"
                    className="group/heart absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/50 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-rose-500 hover:shadow-lg"
                >
                    <Heart
                        size={20}
                        className="transition-colors group-hover/heart:fill-rose-500 group-hover/heart:stroke-rose-500"
                    />
                </button>
            </div>

            <div className="mt-4 space-y-1 px-1 pb-2">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600/70">
                        {product.category}
                    </p>

                    <div className="flex shrink-0 items-center gap-1">
                        <Star
                            size={10}
                            fill="currentColor"
                            className="text-amber-400"
                        />
                        <span className="text-[10px] font-bold text-slate-400">
              {product.rating.toFixed(1)}
            </span>
                    </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {product.name}
                </h3>

                <p
                    className={`text-[11px] font-medium ${
                        product.badge.toLowerCase() === "limited"
                            ? "text-amber-600"
                            : isSoldOut
                                ? "italic text-slate-400"
                                : "text-slate-500"
                    }`}
                >
                    {product.availability}
                </p>

                <div className="flex items-center justify-between gap-3 pt-3">
                    <div className="flex min-w-0 flex-col">
                        {product.originalPrice !== undefined && (
                            <span className="text-[10px] font-medium leading-none text-slate-400 line-through">
                {product.originalPrice.toLocaleString("en-US")} kr
              </span>
                        )}

                        <span
                            className={`text-lg font-black tracking-tight ${
                                isSoldOut ? "text-slate-400" : "text-slate-900"
                            }`}
                        >
              {product.price.toLocaleString("en-US")} kr
            </span>
                    </div>

                    <button
                        type="button"
                        disabled={isSoldOut}
                        onClick={() => onAddToCart(product)}
                        className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition-all duration-300 sm:px-5 ${
                            isSoldOut
                                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                                : "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
                        }`}
                        aria-label={
                            isSoldOut
                                ? `${product.name} is sold out`
                                : `Add ${product.name} to cart`
                        }
                    >
                        {isSoldOut ? "Notify Me" : "Add to cart"}
                    </button>
                </div>
            </div>
        </article>
    );
}
