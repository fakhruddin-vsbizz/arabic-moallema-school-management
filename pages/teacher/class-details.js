import ClassDetais from '@/components/user/teacher/BatchDetais'
import React from 'react'
import grayBgImg from "@/components/src/img/grayBgImg.png";
import TeacherSidebar from '@/components/user/teacher/TeacherSidebar';
import MUIBreadcrumbs from '@/components/Layout/navigation/MUIBreadcrumbs';

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
        width: "100%",
      }}
    >
      <div className="flex min-h-screen h-full">
        <TeacherSidebar />
        <div className="flex-1 h-screen p-7  ">
          <div className="m-0 p-5  w-full h-fit">
            {/* <MUIBreadcrumbs /> */}
            <div className="grid grid-cols-1 w-full mx-auto my-10 gap-10">
              <div className="col-span-1">
              <ClassDetais />            
              </div>             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default classDetails