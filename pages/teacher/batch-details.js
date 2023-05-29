import React from 'react'
import grayBgImg from "@/components/src/img/grayBgImg.png";
import TeacherSidebar from '@/components/user/teacher/TeacherSidebar';
import BackButton from '@/components/Layout/elements/BackButton';
import { Link } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import Sidebar from '@/components/Layout/navigation/Sidebar';
import BatchDetaisCards from '@/components/user/teacher/BatchDetaisCards'
// import MUIBreadcrumbs from '@/components/Layout/navigation/MUIBreadcrumbs';

const classDetails = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${grayBgImg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
        backgroundPosition: "center top",
        minHeight: "100vh",        
        height: "100%",
        MaxWidth: "100%",
        MaxHeight: "100%",
      }}
    >
      <div className="flex min-h-screen h-full">
        <Sidebar nav_index={1} />
        <div className="flex-1  px-5">
          <div className="m-0 p-5  w-full h-fit">
            {/* <MUIBreadcrumbs /> */}
            <div className="grid grid-cols-1 w-full mx-auto my-10 gap-10">
     
              <div className="col-span-1">
                <h1 className=" my-auto text-2xl mt-3 ">
                  <BackButton /> Batch Details
                </h1>
              </div>
             
            
            <Divider variant="middle" />
              <div className="col-span-1">
              <BatchDetaisCards />            
              </div>             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default classDetails