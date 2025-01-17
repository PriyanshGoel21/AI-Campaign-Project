// Card.tsx
import React from "react";

interface CardProps {
  imgSrc: string;
  price: string;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  price,
  description,
  isSelected,
  onToggle,
}) => (
  <div className="relative bg-white rounded-lg shadow-md">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={onToggle}
      className="absolute top-2 left-2 h-5 w-5"
    />
    <img
      className="w-full h-56 object-cover rounded-t-lg"
      src={imgSrc}
      alt="Product"
    />
    <div className="p-4">
      <h5 className="text-lg font-bold">{`${price}`}</h5>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

export default Card;
