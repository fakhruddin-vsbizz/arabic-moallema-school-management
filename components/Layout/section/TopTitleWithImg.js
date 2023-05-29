import React from 'react'
import logo from "@/components/src/img/AMLogo.png"
import { Button } from '@mui/material'
import Link from 'next/link'

const TopTitleWithImg = ({title, btn, link, salam}) => {
  return (
    <div className='pt-10 pb-5'>
        <img
          className="mx-auto  w-2/6 p-5"
          src={logo.src}
          alt="Workflow"
        />
        <div className=" text-center text-2xl font-extrabold text-gray-800">
            <p className='text-5xl text-green-500' >{salam}</p>
            <h1 className='text-5xl font-bold text-white pt-5'>{title}</h1>
          {/* {typeAdmin && <p>Manage Batches Of Your Organization</p>}
          {typeInstructor && <p>Manage Your Batches</p>}
          {typeStudent && <p>You are enrolled in following batches</p>} */}
          {!btn == '' ?(
                    <Link href={link} ><Button className='mt-10 border-2 border-white bg-dark-purple' variant="contained">{btn}</Button></Link>

          ): ''}
        </div>
        
      </div>
  )
}

export default TopTitleWithImg