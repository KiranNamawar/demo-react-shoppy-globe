import { useDispatch, useSelector } from "react-redux";
import { Search, AlertCircle, ShoppingBag } from "lucide-react";
import useProducts from "../hooks/products";
import ProductItem from "./product-item";
import { setSearchQuery, selectSearchQuery } from "../redux/search-slice";

/**
 * Product list component
 * Fetches and displays all products with search functionality
 * Uses custom useProducts hook for data fetching
 */
function ProductList() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const { data, loading, error } = useProducts();

  /**
   * Handle search input change
   */
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  /**
   * Filter products based on search query
   * Searches in title and description
   */
  const filteredProducts = data?.products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <h2>Failed to Load Products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Welcome Section - Only show when not searching */}
      {!searchQuery && (
        <div className="welcome-section">
          <ShoppingBag size={64} className="welcome-icon" />
          <h1 className="welcome-title">Welcome to ShoppyGlobe</h1>
          <p className="welcome-subtitle">
            Discover amazing products at unbeatable prices. Your one-stop shop
            for everything you need!
          </p>
        </div>
      )}

      <div className="product-list-header">
        <h2>{searchQuery ? "Search Results" : "Our Products"}</h2>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search products"
          />
        </div>
      </div>

      {filteredProducts && filteredProducts.length === 0 ? (
        <div className="no-results">
          <AlertCircle size={48} />
          <h3>No products found</h3>
          <p>Try adjusting your search query</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
