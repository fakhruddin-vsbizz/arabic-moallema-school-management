import { useState } from "react";

function Spinner({title}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex items-center justify-center mb-4">
      {isLoading && (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"
            ></path>
          </svg>
          <span className=" text-xl font-bold border-b-2">{title}</span>
        </div>
      )}
    </div>
  );
}

export default Spinner;
