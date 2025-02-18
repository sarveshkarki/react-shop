import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;
    try {
      const res = await getProductById(Number(id));
      setProduct(res);
    } catch (error) {
      setErr("Failed to fetch the product.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>{err}</p>;
  if (!product) return <p>Product not found.</p>;

  const discountedPrice = parseFloat(
    (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2)
  );

  return (
    <>
      <h2>Product item</h2>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h2>{product.title}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h4>{product.availabilityStatus}</h4> <p>|</p>{" "}
          <h4>{product.returnPolicy}</h4>
        </div>
        <p>{product.description}</p>
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={product.title}
            style={{ width: "200px", borderRadius: "5px" }}
          />
        ))}
        <p>
          <strong>Brand:</strong> {product.brand || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Dimensions:</strong> {product.dimensions.width}cm x{" "}
          {product.dimensions.height}cm x {product.dimensions.depth}cm
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Price after discount:</strong> ${discountedPrice}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating} ⭐
        </p>
        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
        <p>
          <strong>Shipping Information:</strong> {product.shippingInformation}
        </p>
        <p>
          <strong>Warranty Information:</strong> {product.warrantyInformation}
        </p>
        <p>
          <strong>Weight:</strong> {product.weight}g
        </p>
        <p>
          <strong>Min Order Quantity:</strong>{" "}
          {product.minimumOrderQuantity || "N/A"}
        </p>
      </div>
      <div>
        <h2>Reviews</h2>
        <div>
          {product.reviews.length > 0 ? (
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "42px",
                listStyle: "none",
              }}
            >
              {product.reviews.map((review, index) => (
                <li
                  key={index}
                  style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
                >
                  <p>
                    <strong>{review.reviewerName}</strong> (
                    {new Date(review.date).toLocaleDateString()})
                  </p>
                  <p>Rating: {review.rating} ⭐</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
