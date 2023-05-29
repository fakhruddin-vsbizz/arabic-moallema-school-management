import InProgress from '@/components/Layout/screen/InProgress'
import Link from 'next/link'
import React from 'react'
import grayBgImg from "@/components/src/img/grayBgImg.png";

const workInProgress = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${grayBgImg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100%",
        backgroundPosition: "center top",
        widows: "100vw",
        height: "100vh",
      }}
    >
      <h1 className="text-center p-10 text-3xl">Work in Progress</h1>
      <InProgress />
    </div>
  )
}

export default workInProgress