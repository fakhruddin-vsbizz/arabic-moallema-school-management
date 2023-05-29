import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Link from "next/link";

import MultipleSelectChip from "@/components/Layout/elements/MultiChipSelector";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const names = ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"];

export default function AddUser({ link, user }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const [batch, setBatch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  let isUser;

  const showChip = () => {
    if (user == "teacher") {
      isUser = true;
    }
  };

  showChip();
  console.log(`KK and isStudent = ${isUser} `);

  return (
    <div className="bg-white p-5 rounded-md shadow-md pl-2">
      <h1 className="text-3xl pl-2">Add New {user}</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          className="pt-2"
        />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="outlined"
          type="number"
          className="pt-2"
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          className="pt-2"
        />
      </Box>

      {!isUser && (
        <FormControl sx={{ m: 1, minWidth: "100%" }}>
          <InputLabel id="demo-controlled-open-select-label">Batch</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={batch}
            label="Batch"
            onChange={handleChange}
          >
            {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
            <MenuItem value={"batch 1"}>batch 1</MenuItem>
            <MenuItem value={"batch 2"}>batch 2</MenuItem>
            <MenuItem value={"batch 3"}>batch 3</MenuItem>
            <MenuItem value={"batch 4"}>batch 4</MenuItem>
          </Select>
        </FormControl>
      )}

      <div className="items-center  py-3 text-right mt-2">
        <Link
          href={link}
          type="submit"
          className="m-0 p-0 w-full"
        >
          <Button variant="contained" className="w-full bg-dark-purple my-3 mx-2" disableElevation>
            Create {user}
          </Button>
        </Link>
      </div>
      {isUser && (
        <div className="m-0 p-0 w-full">
          <MultipleSelectChip />
          <Button variant="contained" className="w-full bg-dark-purple my-3 mx-2" disableElevation>
            Edit Batch
          </Button>
        </div>
      )}
    </div>
  );
}
