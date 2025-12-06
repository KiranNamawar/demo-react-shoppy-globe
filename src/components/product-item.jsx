import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { ShoppingBag, Star } from "lucide-react";
import { addToCart } from "../redux/cart-slice";
import { useState } from "react";

/**
 * Product item card component
 * Displays a single product with image, details, and add to cart button
 */
function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate discounted price
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  /**
   * Handle add to cart button click
   */
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product.id}`} className="product-item">
      <div className="product-image-container">
        {!imageLoaded && <div className="product-image-placeholder" />}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className={`product-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
        {product.discountPercentage > 0 && (
          <span className="product-discount-badge">
            -{product.discountPercentage.toFixed(0)}%
          </span>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details-row">
          <div className="product-rating">
            <Star size={16} fill="currentColor" />
            <span>{product.rating.toFixed(1)}</span>
          </div>

          <div className="product-pricing">
            <span className="product-price">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <span className="product-original-price">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
}

export default ProductItem;
