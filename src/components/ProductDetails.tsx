import React, { Suspense, useEffect, useState } from "react";
import { Product } from "../types/types";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import LazyImage from "./LazyImage";
import "./productDetails.css";

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
    window.scrollTo(0, 0);
    setIsLoading(true);
    fetchProduct();
  }, [id]);

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (err) return <p className="error-text">{err}</p>;
  if (!product) return <p className="error-text">Product not found.</p>;

  const discountedPrice = parseFloat(
    (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2)
  );

  return (
    <div className="product-container">
      <h2 className="product-title">{product.title}</h2>
      <div className="product-images">
        {product.images.map((img, index) => (
          <div key={index}>
            <LazyImage
              src={img}
              alt={product.title}
              className="product-image"
            />
          </div>
        ))}
      </div>
      <p className="product-description">{product.description}</p>

      <div className="product-detail-info">
        <div>
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
          <p className="discounted-price">
            <strong>Price after discount:</strong> ${discountedPrice}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating} ⭐
          </p>

          <p
            className={`stock-status ${
              product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div>
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
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {product.reviews.length > 0 ? (
          <ul className="reviews-list">
            {product.reviews.map((review, index) => (
              <li key={index} className="review-item">
                <p className="review-author">
                  <strong>{review.reviewerName}</strong> (
                  {new Date(review.date).toLocaleDateString()})
                </p>
                <p className="review-rating">Rating: {review.rating} ⭐</p>
                <p className="review-comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-reviews">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
