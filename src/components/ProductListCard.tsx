import { useNavigate } from "react-router-dom";
import { Product } from "../types/types";

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
    <li
      onClick={() => navigate(`/product/${id}`)}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        listStyle: "none",
      }}
    >
      <img
        src={thumbnail}
        alt={title}
        style={{ width: "100px", borderRadius: "5px" }}
      />
      <h3>{title}</h3>
      <p>
        <strong>Brand:</strong> {brand}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <p>
        <strong>Rating:</strong> {rating}🌟
      </p>
      <p>
        <strong>Stock:</strong> {stock} left
      </p>
      <p>
        <strong>Min Order Quantity:</strong> {minimumOrderQuantity || "N/A"}
      </p>
      <p>
        <strong>Availability:</strong> {stock > 0 ? "In Stock" : "Out of Stock"}
      </p>
    </li>
  );
};
export default ProductListCard;
