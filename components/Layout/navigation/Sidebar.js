import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import logo from "@/components/src/img/AMLogo.png";
import sidebarBgImg from "@/components/src/img/Frame73.png";
import { useRouter } from "next/router";
import avatar from "@/components/src/img/ArabicMollemaMascot-01.png";
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

// MUI Icons
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CampaignIcon from "@mui/icons-material/Campaign";
import AuthContext from "@/components/Context/store/auth-context";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BatchContext from "@/components/Context/store/batch-context";

const Sidebar = (props) => {
  const batchCtx = useContext(BatchContext);

  useEffect(() => {
    batchCtx.setBatchNameHandler(props.batchName);
  }, [props.batchName]);

  let batchName = batchCtx.batchName;
  console.log(batchName);
  let nav_data = nav_reference(batchName)[props.nav_index];

  console.log(props.batchName);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = (e) => {
    console.log("LoggOut");
    authCtx.logout();
    // router.replace("/");
  };
  const [open, setOpen] = useState(false);

  // var width = (window.innerWidth)

  // if(1060>=1050){
  //   console.log('wS', width)
  // }

  // window.innerWidth <= 1050 ? setOpen(true)

  return (
    <div className="flex ">
      <div
        className={` ${
          open ? "w-72" : "w-24 "
        } bg-dark-purple min-h-screen h-full p-5  pt-8 relative duration-300`}
        style={{
          backgroundImage: `url(${sidebarBgImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          position: "fixed",
          top: 0,
          position: " -webkit-sticky",

          // overflow: 'hidden'
        }}
      >
        <MenuOpenIcon
          className={`absolute cursor-pointer -right-3 top-9 w-8 text-3xl text-dark-purple border-dark-purple  bg-white
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src={logo.src}
            className={`cursor-pointer duration-500 rounded-md `}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-100 ${
              !open && "scale-0"
            }`}
          ></h1>
        </div>

        <ul className="pt-6">
          {open && (
            <Divider className="text-white border-white">
              <Chip label="Dashboard" className="bg-white text-dark-purple" />
            </Divider>
          )}
          {nav_data.map((nav_obj) => (
            <Link href={nav_obj.link}>
              <li
                // key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
              >
                <Tooltip title={nav_obj.linkname}>
                  <span
                    className="bg-white rounded-sm "
                    style={{ padding: "7px" }}
                  >
                    {nav_obj.img}
                  </span>
                </Tooltip>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-base`}
                >
                  {nav_obj.linkname}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        <ul className="mt-10">
          {open && (
            <Divider className="text-white border-white">
              <Chip label="User" className="bg-white text-dark-purple" />
            </Divider>
          )}
          <Link href="/">
            <li
              // key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              {/* <img src={nav_obj.img} className="w-8 border rounded-md" />  */}
              <Tooltip title="My Profile">
                <Avatar alt="User" src={avatar} />
              </Tooltip>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-base`}
              >
                My Profile
              </span>
            </li>
          </Link>
          <Link href="/">
            <li
              // key={index}
              onClick={logoutHandler}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <Tooltip title="Log Out">
                <span
                  className="bg-white rounded-sm "
                  style={{ padding: "7px" }}
                >
                  <LogoutIcon className="text-dark-purple" />
                </span>
              </Tooltip>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-base`}
              >
                Log Out
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;

const ListItemObj = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={props.linkname}></ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

function nav_reference(batchName) {
  const [batch, setBatch] = useState();

  useEffect(() => {
    const batch = localStorage.getItem("batchName");
    setBatch(batch);
  }, []);

  let nav_reference_ovj;
  nav_reference_ovj = {
    0: [
      {
        linkname: "Batches",
        link: "/admin",
        img: <ClassIcon className="text-dark-purple" />,
      },

      {
        linkname: "Students",
        link: "/admin/students",
        img: <GroupsIcon className="text-dark-purple" />,
      },
      {
        linkname: "Teachers",
        link: "/admin/teachers",
        img: <SchoolIcon className="text-dark-purple" />,
      },
      {
        linkname: "Chat",
        link: "/admin/chat",
        img: <ChatIcon className="text-dark-purple" />,
      },
    ],
    1: [
      {
        linkname: "Batches",
        link: "/teacher",
        img: <DashboardIcon className="text-dark-purple" />,
      },

      {
        linkname: "Batch progress",
        link: `/teacher/batch-detail/${batch}`,
        img: <GroupsIcon className="text-dark-purple" />,
      },

      {
        linkname: "Start Class",
        link: `/teacher/class`,
        img: <LiveTvIcon className="text-dark-purple" />,
      },
     
      {
        linkname: "Chat",
        link: `/teacher/chat`,
        img: <ChatIcon className="text-dark-purple" />,
      },
    ],
    2: [
      {
        linkname: "Classes",
        link: "/student",
        img: <DashboardIcon className="text-dark-purple" />,
      },
      // {
      //   linkname: "Assignments",
      //   link: "/student/activity",
      //   img: <ClassIcon className="text-dark-purple" />,
      // },
      {
        linkname: "Join Class",
        link: "/student/class",
        img: <LiveTvIcon className="text-dark-purple" />,
      },
      {
        linkname: "Chat",
        link: "/student/chat",
        img: <ChatIcon className="text-dark-purple" />,
      },
      // {
      //   linkname: "Assessment",
      //   link: "/student/assessment",
      //   img: <LiveTvIcon className="text-dark-purple" />,
      // },
    ],
  };
  return nav_reference_ovj;
}
