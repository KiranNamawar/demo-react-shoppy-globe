import { Link, useLocation } from "react-router";
import { AlertTriangle, Home } from "lucide-react";

/**
 * 404 Not Found page
 * Displays error information for unknown routes
 */
function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <AlertTriangle size={80} className="not-found-icon" />
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <div className="error-details">
          <p>The page you are looking for does not exist.</p>
          <div className="error-path">
            <strong>Requested URL:</strong>
            <code>{location.pathname}</code>
          </div>
          <p className="error-help">This could be because:</p>
          <ul className="error-reasons">
            <li>The URL was typed incorrectly</li>
            <li>The page has been moved or deleted</li>
            <li>The link you followed is outdated</li>
          </ul>
        </div>
        <Link to="/" className="home-button">
          <Home size={20} />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
