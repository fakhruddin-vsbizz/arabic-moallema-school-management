import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Chip } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MUIMiniCard = ({
  disc,
  title,
  isBtn,
  btnText,
  link,
  minTitle,
  subTitle,
  isChip,
  chipLable,
  user,
}) => {
  const btn = isBtn || false;
  const chip = isChip || false;
  return (
    <div className="flex-row ">
      <Card
        sx={{ minWidth: 180 }}
        className="p-4 w-full  hover:bg-dark-purple hover:text-white text-dark-purple text-bold place-content-center text-center shadow-lg flex-row"
      >
        <CardContent className="text-bold whitespace-normal">
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {minTitle}
          </Typography>
          <Typography variant="h5" component="div" className="w-full">
            <h1 className="text-lg xl:text-xl">{title}</h1>
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{subTitle}</Typography>
          <Typography variant="body2">{disc}</Typography>
        </CardContent>
        {btn && user !== "student" && (
          <div className="flex-row">
            <Divider variant="middle" className="my-2 bg-gray-200" />
            <CardActions className=" place-content-center ">
              <Link href={link}>
                <Button
                  size="medium"
                  className="text-center w-48 border-2 border-white bg-dark-purple text-white hover:bg-white hover:text-dark-purple"
                >
                  {btnText}
                </Button>
              </Link>
            </CardActions>
          </div>
        )}
        {chip && (
          <div>
            <Divider variant="middle" className="my-2 bg-gray-200" />
            <CardActions className=" place-content-center">
              <Button size="medium" className="text-center w-48 border-2">
                <Chip label={chipLable} color="warning" variant="outlined" />
              </Button>
            </CardActions>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MUIMiniCard;
