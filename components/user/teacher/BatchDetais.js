import * as React from "react";
import Link from "next/link";
import SelectDropdown from "@/components/Layout/elements/SelectDropdown";
import MUISlider from "@/components/Layout/slider/MUISlider";

const ClassDetais = () => {

  return (
    <div className="">
      <div className="" >
        <div className="px-20 w-full">
        <SelectDropdown value="user" lable="Select Student" />
        </div>

        <h1 className="text-lg text-green-500 mt-10">Completed Classes</h1>
        <MUISlider />

        <h1 className="text-lg text-red-500 mt-10">Incomplete Classes</h1>
        <MUISlider />
      </div>
    </div>
  );
};

export default ClassDetais;
