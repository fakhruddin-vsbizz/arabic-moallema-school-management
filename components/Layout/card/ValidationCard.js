import React from "react";

const ValidationCard = ({ title, message }) => {
  return (
    <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 py-2 px-3 shadow-md mb-4">
      <div className="text-yellow-500 rounded-full bg-white mr-3">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <div className="text-black">
        <p className="font-bold">{title}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ValidationCard;
