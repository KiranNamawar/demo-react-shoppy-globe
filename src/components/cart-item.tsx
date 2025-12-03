import { useDispatch } from "react-redux";
import { Plus, Minus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../redux/cart-slice";
import {
    updateQuantity,
    deleteFromCart,
    addToCart,
    removeFromCart,
} from "../redux/cart-slice";
import { useState } from "react";

/**
 * Cart item component
 * Displays a single cart item with quantity controls and remove button
 */
function CartItem({ item }: { item: CartItemType }) {
    const dispatch = useDispatch();
    const [imageLoaded, setImageLoaded] = useState(false);
    const { product, quantity } = item;

    // Calculate item subtotal
    const subtotal = (product.price * quantity).toFixed(2);

    /**
     * Increment quantity by 1
     */
    const handleIncrement = () => {
        dispatch(addToCart(product));
    };

    /**
     * Decrement quantity by 1
     * Minimum quantity is 1
     */
    const handleDecrement = () => {
        if (quantity > 1) {
            dispatch(removeFromCart(product.id));
        }
    };

    /**
     * Handle direct quantity input change
     */
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
        }
    };

    /**
     * Remove item completely from cart
     */
    const handleRemove = () => {
        dispatch(deleteFromCart(product.id));
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image-container">
                {!imageLoaded && <div className="cart-item-image-placeholder" />}
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className={`cart-item-image ${imageLoaded ? "loaded" : ""}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            <div className="cart-item-details">
                <h3 className="cart-item-title">{product.title}</h3>
                <p className="cart-item-price">${product.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-controls">
                <div className="quantity-controls">
                    <button
                        onClick={handleDecrement}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                    >
                        <Minus size={16} />
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="quantity-input"
                        min="1"
                        aria-label="Quantity"
                    />
                    <button
                        onClick={handleIncrement}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <div className="cart-item-subtotal">
                    <span className="subtotal-label">Subtotal:</span>
                    <span className="subtotal-amount">${subtotal}</span>
                </div>

                <button
                    onClick={handleRemove}
                    className="remove-btn"
                    aria-label={`Remove ${product.title} from cart`}
                >
                    <Trash2 size={18} />
                    <span>Remove</span>
                </button>
            </div>
        </div>
    );
}

export default CartItem;
