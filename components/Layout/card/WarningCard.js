import React from "react";

function WarningCard(props) {
  const { title, message } = props;

  return (
    <div className="bg-white border-l-4 border-blue-400 text-dark-purple p-4 mt-4 w-full rounded-md shadow-md">
      <div className="flex items-center justify-center ">
        <div className="flex-shrink-0">
          <h3 className="text-lg font-semibold p-2 border-b-2 border-blue-400 rounded-sm">
            {title || "No Data Found"}
          </h3>
          <img
            className="w-40 mx-auto"
            src="https://s9.gifyu.com/images/101961-non-data-found.gif"
          />
          <div className="mt-2 text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default WarningCard;
