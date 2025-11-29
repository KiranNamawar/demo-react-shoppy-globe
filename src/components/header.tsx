import { Link } from "react-router";
import { ShoppingCart, Store } from "lucide-react";

function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex gap-2 items-center">
          <Store />
          <h1 className="text-2xl">Shoppy Globe</h1>
        </Link>
        <Link to="/cart">
          <ShoppingCart />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
