import { useNavigate } from "react-router-dom";
import { Product } from "../types/types";
import "./productListCard.css";
const ProductListCard = ({
  id,
  thumbnail,
  title,
  brand,
  category,
  price,
  rating,
  stock,
  minimumOrderQuantity,
}: Product) => {
  const navigate = useNavigate();

  return (
    <li className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <h3 className="product-list-title">{title}</h3>
      <img className="product-image" src={thumbnail} alt={title} />
      <div className="product-list-info">
        {brand && (
          <p className="product-brand">
            <strong>Brand:</strong> {brand}
          </p>
        )}
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p className="product-rating">
          <strong>Rating:</strong> {rating} ⭐
        </p>
        <p>
          <strong>Stock:</strong> {stock} left
        </p>
        <p>
          <strong>Min Order:</strong> {minimumOrderQuantity || "N/A"}
        </p>
        <p
          className={`availability ${stock > 0 ? "in-stock" : "out-of-stock"}`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </li>
  );
};

export default ProductListCard;
