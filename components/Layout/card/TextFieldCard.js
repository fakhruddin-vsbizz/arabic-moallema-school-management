import React from "react";


import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MUIMiniCard = ({
  minTitle,
}) => {
  return (
    <div>
      <Card
        sx={{ minWidth: 160 }}
        className="p-4 w-fit hover:bg-dark-purple   text-dark-purple text-bold place-content-center text-center shadow-lg"
      >
        <CardContent className="text-bold  ">
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {minTitle}
          </Typography>
          <input className="w-full h-24 text-center text-4xl border-b-2 rounded-md " />
        </CardContent>
        <Stack direction="" className="mr-auto" spacing={1}>
          <div className="flex justify-center w-full">
            <div className="">
              <IconButton aria-label="fingerprint" color="success">
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
            <div className="">
              <IconButton aria-label="fingerprint" className="text-red-500">
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </Stack>
      </Card>
    </div>
  );
};

export default MUIMiniCard;
