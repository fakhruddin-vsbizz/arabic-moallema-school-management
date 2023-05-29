import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = ({ allItems, type, lable, handleSelectedItem }) => {
  const [selectedItem, setSelectedItem] = React.useState("");

  React.useEffect(() => {
    handleSelectedItem(selectedItem);
  }, [selectedItem]);

  return (
    <div className="grid grid-cols-6 mt-2">
      <div className="col-span-2 mt-2">
        <label className=" mt-3 pt-2 pr-2">{lable}</label>
      </div>
      {type !== "studentList" && (
        <div className="col-span-4">
          {allItems && (
            <Box sx={{ minWidth: 70 }} className="w-full ">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  size="small"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  {allItems.map((item) => (
                    <MenuItem value={item.batch_name}>
                      {item.batch_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </div>
      )}
      {type === "studentList" && (
        <div className="col-span-4">
          {allItems && (
            <Box sx={{ minWidth: 70 }} className="w-full ">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  size="small"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  {allItems.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicSelect;
