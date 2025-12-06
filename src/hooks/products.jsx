import { useEffect, useState } from "react";

const BASE_URL = "https://dummyjson.com/products/";

function useProducts(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = id ? BASE_URL + id : BASE_URL;

  useEffect(() => {
    let ignore = false;

    async function getProducts() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        if (!ignore) setData(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (!ignore) setError(message);
        console.error(message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    getProducts();

    return () => {
      ignore = true;
    };
  }, [API_URL]);

  return { data, loading, error };
}

export default useProducts;
