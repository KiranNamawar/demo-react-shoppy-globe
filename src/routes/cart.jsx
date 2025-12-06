import { useSelector } from "react-redux";
import { Link } from "react-router";
import { ShoppingCart, ArrowRight, Package } from "lucide-react";
import {
    selectCartItems,
    selectCartTotal,
    selectCartItemsCount,
} from "../redux/cart-slice";
import CartItem from "../components/cart-item";

/**
 * Cart page component
 * Displays all items in the cart with summary and checkout option
 */
function Cart() {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const cartItemsCount = useSelector(selectCartItemsCount);

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <ShoppingCart size={64} />
                <h2>Your Cart is Empty</h2>
                <p>Add some products to your cart to see them here.</p>
                <Link to="/" className="continue-shopping-btn">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p className="cart-item-count">
                    {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"}
                </p>
            </div>

            <div className="cart-content">
                {/* Cart Items List */}
                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal ({cartItemsCount} items)</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free-shipping">FREE</span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-row total">
                        <span>Total</span>
                        <span className="total-amount">${cartTotal.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" className="checkout-btn">
                        <span>Proceed to Checkout</span>
                        <ArrowRight size={20} />
                    </Link>

                    <Link to="/" className="continue-shopping-link">
                        <Package size={18} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;
