# React Components and Props

## 1. Components Created

The project is an e-commerce shop called **LITE.SHOP**, built with React, TypeScript, and Tailwind CSS. The application is divided into reusable components, each responsible for a specific part of the user interface.

### `App.tsx`

**Purpose:** The main component of the application. It manages the application's state and connects the other components.

Responsibilities:
- Stores the search query, selected categories, maximum price, stock filter, sale filter, sorting option, and shopping cart.
- Filters and sorts the products based on the user's selections.
- Handles adding products to the cart and removing items from it.
- Passes data and event-handler functions to child components.

### `Header.tsx`

**Purpose:** Displays the website header and navigation.

Responsibilities:
- Displays the LITE.SHOP logo and navigation links.
- Provides the product search input.
- Displays the shopping cart icon and item count.
- Shows a cart dropdown with products, prices, subtotal, and remove buttons.
- Provides a mobile navigation menu.

Props:
- `searchQuery`: The current search text.
- `onSearchChange`: A function that updates the search query.
- `cart`: An array containing the products added to the cart.
- `onRemoveCartItem`: A function that removes a product from the cart.

### `Sidebar.tsx`

**Purpose:** Displays the product filters.

Responsibilities:
- Allows users to filter products by category.
- Provides a maximum-price slider.
- Allows users to show only products in stock.
- Allows users to show only products on sale.
- Provides a button to reset the filters.

Props:
- `selectedCategories`: The currently selected product categories.
- `onCategoriesChange`: Updates the selected categories.
- `maxPrice`: The current maximum price.
- `onMaxPriceChange`: Updates the maximum price.
- `inStockOnly`: Indicates whether the stock filter is enabled.
- `onInStockChange`: Updates the stock filter.
- `saleOnly`: Indicates whether the sale filter is enabled.
- `onSaleChange`: Updates the sale filter.
- `onReset`: Resets the filters to their default values.

### `ProductGrid.tsx`

**Purpose:** Displays the products in a responsive grid.

Responsibilities:
- Renders a `ProductCard` for each product.
- Displays a message when no products match the selected filters.
- Displays pagination controls.
- Passes each product and the add-to-cart function to its product card.

Props:
- `products`: The array of products to display.
- `onAddToCart`: A function that adds a product to the shopping cart.

### `ProductCard.tsx`

**Purpose:** Displays an individual product.

Responsibilities:
- Shows the product image, name, category, rating, price, and availability.
- Displays product badges, such as "Discount", "Popular", or "New Arrival".
- Shows the original price when a discounted price is available.
- Provides an add-to-cart button.
- Disables adding unavailable products to the cart.

Props:
- `product`: The product object containing its information.
- `onAddToCart`: A function called when the user adds the product to the cart.

### `Newsletter.tsx`

**Purpose:** Displays the newsletter section, encouraging visitors to subscribe for updates.

This component is included in `App.tsx` and is responsible for its own presentation.

### `Footer.tsx`

**Purpose:** Displays the website footer.

Responsibilities:
- Shows the brand information.
- Provides navigation and support links.
- Provides a link to return to the top of the page.
- Displays the copyright information.

## 2. Why I Used Props

Props allow components to receive data and functions from their parent components. I used props to make the components reusable and to avoid duplicating logic.

For example, `ProductGrid` receives the product array and the `onAddToCart` function from `App.tsx`. It passes each product and the same function to `ProductCard`.

When a user clicks the add-to-cart button, the card calls `onAddToCart(product)`. This function updates the cart state in `App.tsx`. React then re-renders the components that depend on the updated cart.

Props also allow `Header` and `Sidebar` to communicate user actions back to `App.tsx` through callback functions. This keeps the main application state in one place while allowing individual components to focus on their own responsibilities.

## 3. How the Components Work Together

The application follows a parent-child component structure.

1. `App.tsx` loads the product data and manages the main application state.
2. `Header.tsx` receives the search query and cart data through props. User actions call callback functions provided by `App.tsx`.
3. `Sidebar.tsx` receives the current filter values and callback functions. When a filter changes, `App.tsx` updates its state.
4. `App.tsx` filters and sorts the product data, then passes the resulting array to `ProductGrid.tsx`.
5. `ProductGrid.tsx` creates a `ProductCard.tsx` for each matching product.
6. `ProductCard.tsx` displays product information and calls `onAddToCart` when the user adds an available product.
7. `App.tsx` updates the cart state and passes the updated cart to `Header.tsx`, where the cart count and dropdown are updated.
8. `Newsletter.tsx` and `Footer.tsx` render the sections below the main product area.

## 4. Summary

Using components and props makes the application easier to understand, maintain, and extend. Each component has a clear responsibility, while `App.tsx` coordinates shared state and data flow.

This structure also makes it easier to update one part of the website without having to rewrite the entire application.