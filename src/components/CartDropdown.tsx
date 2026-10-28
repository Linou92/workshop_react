
import type { Product } from "../types/product";
import { ShoppingBag, X } from "lucide-react";

interface CartDropdownProps {
    cart: Product[];
    onRemoveItem: (index: number) => void;
}

function CartDropdown({ cart, onRemoveItem }: CartDropdownProps) {
    const subtotal = cart.reduce((total, product) => total + product.price, 0);

    return (
        <div className="absolute right-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white p-4 text-gray-900 shadow-xl sm:w-96">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your cart</h2>
                <span className="text-sm text-gray-500">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
            </div>

            {cart.length === 0 ? (
                <div className="py-8 text-center">
                    <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                    <p className="font-medium">Your cart is empty</p>
                    <p className="mt-1 text-sm text-gray-500">
                        Add a product to get started.
                    </p>
                </div>
            ) : (
                <>
                    <ul className="max-h-72 space-y-4 overflow-y-auto">
                        {cart.map((product, index) => (
                            <li
                                key={`${product.id}-${index}`}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-16 w-16 rounded-lg bg-gray-100 object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-medium">
                                        {product.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {product.price.toLocaleString("en-US")} kr
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onRemoveItem(index)}
                                    aria-label={`Remove ${product.name} from cart`}
                                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-5 border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>{subtotal.toLocaleString("en-US")} kr</span>
                        </div>

                        <p className="mt-2 text-xs text-gray-500">
                            Shipping and taxes are not included.
                        </p>

                        <button
                            type="button"
                            onClick={() => alert("Checkout is not connected yet.")}
                            className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                        >
                            Continue to checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartDropdown;
