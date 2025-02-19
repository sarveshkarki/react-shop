import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { Product, ProductsResponse } from "../types/types";
import ProductListCard from "./ProductListCard";

const LIMIT = 10;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const fetchProducts = async (pageNumber: number) => {
    setIsLoading(true);
    const skip = (pageNumber - 1) * LIMIT;

    try {
      const res: ProductsResponse = await getAllProducts(skip, LIMIT);
      setProducts(res.products);
      setTotal(res.total);
    } catch (error) {
      setErr("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  if (isLoading) return <div>Loading....</div>;
  if (err) return <p>{err}</p>;

  if (products.length === 0) {
    return <h2>No Products In The List.</h2>;
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div>
      <h2>Product List</h2>
      <ul style={{ paddingInlineStart: "10px" }}>
        {products.map((product) => (
          <ProductListCard key={product.id} {...product} />
        ))}
      </ul>
      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
