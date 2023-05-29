import MUIMiniCard from '@/components/Layout/card/MUIMiniCard'
import React from 'react'

const ClassList = () => {
  return (
    <div>  <div className="grid grid-cols-3 w-full mx-auto my-10 gap-10">
    <div className="col-span-auto">
      <MUIMiniCard
        title="Batch 1"
        disc=""
        isBtn="true"
        btnText="open"
        link="/teacher/batch-details"
        // minTitle=""
        // subTitle=""
      />
    </div>
    <div className="col-span-auto">
      <MUIMiniCard
        title="Batch 2"
        disc=""
        isBtn="true"
        btnText="open"
        link="/teacher/batch-details"
      />
    </div>
    <div className="col-span-auto">
      <MUIMiniCard
        title="Batch 3"
        disc=""
        isBtn="true"
        btnText="open"
        link="/teacher/batch-details"
      />
    </div>
  </div></div>
  )
}

export default ClassList