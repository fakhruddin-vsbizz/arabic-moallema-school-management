import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import BatchContext from "@/components/Context/store/batch-context";

export default function CheckboxListSecondary({
  value,
  presentStudentsArray,
  absentStudents,
  type,
  enrollStudents,
}) {
  const [checked, setChecked] = React.useState([]);
  const batchCtx = React.useContext(BatchContext);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  batchCtx.setAttendanceList(checked);

  console.log(checked);

  let attendanceArray =
    type === "present" ? presentStudentsArray : absentStudents;

  if (type === "markAttendance") {
    attendanceArray = enrollStudents;
  }

  return (
    <>
      {attendanceArray &&
        attendanceArray.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <>
              <div className="flex px-2 py-3">
                <p className=" w-full">{`${
                  type === "present" ? value : value
                }`}</p>
                {type === "markAttendance" ? (
                  <input
                    type="checkbox"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    class="rounded-md py-2 px-3"
                  />
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
    </>
  );
}
