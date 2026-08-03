import { useEffect, useState } from "react";
import * as shopApi from "../../api/shop.api";

/** Fetches one shop category's product list, tracking its own loading/error state. */
export const useCategoryProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    shopApi
      .getProductsByCategory(category)
      .then((response) => {
        if (isMounted) setProducts(response.data.data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { products, loading, error };
};
