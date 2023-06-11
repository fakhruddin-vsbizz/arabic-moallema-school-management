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
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CheckCircle from '@mui/icons-material/CheckCircle';

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

  const newDisc =
    new Date(disc) === "Invalid Date" ? disc : new Date(disc).toDateString();

    const StyledAvatar = styled(Card)`
    ${({ theme }) => `
    cursor: pointer;
    background-color: ${theme.palette.primary.main};
    transition: ${theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      background-color: ${theme.palette.secondary.main};
      transform: scale(1.1);
    }
    `}
  `;

  return (
    <div className="flex-row animate-popupSlide bg-transparent ">
      
        <Card
          sx={{ minWidth: 180, backgroundColor: '#015e6d', color: 'white', borderRadius:'20px' }}
          className="p-4 w-full transition duration-150 ease-out hover:ease-in text-bold place-content-center text-center shadow-lg flex-row"
        >
          <CardContent className="text-bold whitespace-normal animate-popupSlide hover:animate-popupSlide">
            <Typography className="text-md" gutterBottom>
              {minTitle}
            </Typography>
            <Typography variant="h5" component="div" className="w-full">
              <h1 className="text-xl xl:text-2xl ">{title}</h1>
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{subTitle}</Typography>
            <Typography variant="body2">{newDisc == 'Invalid Date' ? "" : newDisc}</Typography>
          </CardContent>
          {btn && user !== "student" && (
            <div className="flex-row">
              <Divider variant="middle" className="my-2 bg-gray-200" />
              <CardActions className=" place-content-center ">
                <Link href={link}>
                  <Button
                    size="medium"
                    style={{ backgroundColor: '#fb933c', color: 'white', border: '2px solid rgb(107 114 128)', borderRadius:'20px' }}
                    className="text-center w-48 border-2 border-white bg-lime-500 text-white"
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
                <Button size="medium" className="text-center w-48 border-2" style={{ color:'yellowgreen' }}>
                  <CheckCircle/>&nbsp;&nbsp;<Chip label={chipLable} style={{color: 'yellowgreen'}} variant="outlined" />
                </Button>
              </CardActions>
            </div>
          )}
        </Card>
     
    </div>
  );
};

export default MUIMiniCard;
