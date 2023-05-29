import MUIMiniCard from "@/components/Layout/card/MUIMiniCard";
import React from "react";

const CardList = ({ title, subTitle, link, disc }) => {
  return (
    <div className=" w-full">
      <div className="w-full h-full">
        <MUIMiniCard
          title={title}
          disc={subTitle}
          isBtn="true"
          btnText="open"
          link={link}
        />
      </div>
    </div>
  );
};

export default CardList;
