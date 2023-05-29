import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Link from "next/link";
import MUIMiniCard from "../card/MUIMiniCard";

const MUISlider = ({ card }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue, card) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <Box sx={{ minWidth: "560" }} className="w-full my-3 ">
        <Tabs
          // value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {/* Custome Cards  */}
          <div className=" w-1/4 flex">{card}</div>

          {/* with link */}
          {/* <Link href="/" className="w-full m-5">
              <Tab
                label="Chapter 1 {MUI Wit Link}"
                
                className="w-full border-2 p-20 shadow-lg hover:bg-dark-purple bg-white hover:text-white m-0"
              />
            </Link>
            */}

          {/* witout Link */}
          {/* <Tab
              label="Chapter 1 {MUI WitOut Link}"
              className="w-full border-2 p-20 shadow-lg hover:bg-dark-purple bg-white hover:text-white m-5"
            /> */}
        </Tabs>
      </Box>
    </div>
  );
};

export default MUISlider;
