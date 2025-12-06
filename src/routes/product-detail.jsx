import { useParams, Link } from "react-router";
import { useDispatch } from "react-redux";
import {
  AlertCircle,
  Star,
  ShoppingBag,
  ArrowLeft,
  Package,
  Truck,
  Shield,
} from "lucide-react";
import useProducts from "../hooks/products";
import { addToCart } from "../redux/cart-slice";
import { useState } from "react";

/**
 * Product detail page
 * Displays comprehensive information about a single product
 * Uses dynamic route parameter to fetch specific product
 */
function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    data: product,
    loading,
    error,
  } = useProducts(productId ? parseInt(productId, 10) : undefined);

  /**
   * Handle add to cart button click
   */
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading product details...</p>
      </div>
    );
  }

  // Error state or invalid product
  if (error || !product) {
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <h2>Product Not Found</h2>
        <p>{error || "The requested product does not exist."}</p>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back to Products
        </Link>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      <div className="product-detail-content">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            {!imageLoaded && (
              <div className="product-image-placeholder large" />
            )}
            <img
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              loading="lazy"
              className={`main-image ${imageLoaded ? "loaded" : ""}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {product.images.length > 1 && (
            <div className="thumbnail-gallery">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setImageLoaded(false);
                  }}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.title}</h1>
            {product.brand && <p className="product-brand">{product.brand}</p>}
          </div>

          <div className="product-rating-detail">
            <div className="rating-stars">
              <Star size={20} fill="currentColor" />
              <span className="rating-value">{product.rating.toFixed(1)}</span>
            </div>
            <span className="review-count">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="product-pricing-detail">
            <span className="price-current">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="price-original">
                  ${product.price.toFixed(2)}
                </span>
                <span className="discount-badge">
                  Save {product.discountPercentage.toFixed(0)}%
                </span>
              </>
            )}
          </div>

          <p className="product-description-detail">{product.description}</p>

          <div className="product-meta">
            <div className="meta-item">
              <Package size={20} />
              <div>
                <span className="meta-label">Availability</span>
                <span
                  className={`meta-value stock-${product.availabilityStatus.toLowerCase().replace(" ", "-")}`}
                >
                  {product.availabilityStatus} ({product.stock} units)
                </span>
              </div>
            </div>

            <div className="meta-item">
              <Truck size={20} />
              <div>
                <span className="meta-label">Shipping</span>
                <span className="meta-value">
                  {product.shippingInformation}
                </span>
              </div>
            </div>

            <div className="meta-item">
              <Shield size={20} />
              <div>
                <span className="meta-label">Warranty</span>
                <span className="meta-value">
                  {product.warrantyInformation}
                </span>
              </div>
            </div>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-btn large">
            <ShoppingBag size={20} />
            <span>Add to Cart</span>
          </button>

          <div className="additional-info">
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section - Full Width */}
      {product.reviews.length > 0 && (
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <div className="review-rating">
                    <Star size={16} fill="currentColor" />
                    <span>{review.rating}</span>
                  </div>
                  <span className="reviewer-name">{review.reviewerName}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
