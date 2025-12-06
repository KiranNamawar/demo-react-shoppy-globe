import { Link } from "react-router";
import { ShoppingCart, Home } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../redux/cart-slice";

/**
 * Header component with navigation and shopping cart
 * Displays the app title, navigation links, and cart icon with item count badge
 */
function Header() {
    const cartItemsCount = useSelector(selectCartItemsCount);

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo/Title */}
                <Link to="/" className="logo">
                    <h1>ShoppyGlobe</h1>
                </Link>

                {/* Navigation */}
                <nav className="nav">
                    <Link to="/" className="nav-link">
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                    <Link to="/cart" className="nav-link cart-link">
                        <div className="cart-icon-wrapper">
                            <ShoppingCart size={20} />
                            {cartItemsCount > 0 && (
                                <span className="cart-badge">{cartItemsCount}</span>
                            )}
                        </div>
                        <span>Cart</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
