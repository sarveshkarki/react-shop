import React, { useState } from "react";
import "./productDetails.css";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="image-container">
      {!isLoaded && <p className="image-loading"></p>}
      <img
        src={src}
        alt={alt}
        style={{
          width: "200px",
          height: "150px",
          borderRadius: "5px",
          display: isLoaded ? "block" : "none",
        }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
