import * as React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";
export default function BackButton({isBtn, btn}) {
  const back = () => {
    history.back();
  };

  return (
    <>
    {isBtn == 'true' ? ( <Button variant="contained" className="p-0  bg-dark-purple" startIcon={<KeyboardBackspaceIcon />}>
        {btn} 
      </Button>) : (
      <IconButton
        className=" "
        aria-label="back"
        size="small"
        onClick={() => back()}
      >
        <KeyboardBackspaceIcon fontSize="small" />
      </IconButton>
      )}
    </>
  );
}
