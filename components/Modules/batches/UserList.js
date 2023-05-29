import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function PinnedSubheaderList({ enrollStudents, batchName }) {
  let router = useRouter();

  const goToUserProfile = (id) => {
    console.log(id);
    router.push(`/admin/students/studentprofile/${id}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className=" border-b-2 p-3 border-dark-black">
        <h1 className="text-2xl">Enrolled Students</h1>
      </div>
      <List
        sx={{
          width: "100%",
          minWidth: 320,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
          "& ul": { padding: 0 },
        }}
        className="rounded-md"
        subheader={<li />}
      >
        <li>
          <ul>
            <ListSubheader>{`From ${batchName}`}</ListSubheader>
            {enrollStudents.map((student) => (
              <ListItem key={student}>
                <ListItemText primary={student} />
                <Button onClick={() => goToUserProfile(student)}>
                  View Profile
                </Button>
              </ListItem>
            ))}
          </ul>
        </li>
      </List>
    </div>
  );
}
