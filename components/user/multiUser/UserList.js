import MUIMiniCard from '@/components/Layout/card/MUIMiniCard'
import React from 'react'

const StudentList = ({user, link}) => {
  return (
    <div><div className="grid grid-cols-2 lg:grid-cols-3 w-full mx-auto my-10 gap-10">
    <div className="col-span-auto">
      <MUIMiniCard
        title={user + "1"}
        disc=""
        isBtn="true"
        btnText="open"
        link={link}
        // minTitle=""
        // subTitle=""
      />              
    </div>
    <div className="col-span-auto">
      <MUIMiniCard
        title={user + "2"}
        disc=""
        isBtn="true"
        btnText="open"
        link={link}
        
      />              
    </div>
    <div className="col-span-auto">
      <MUIMiniCard 
        title={user + "3"}
        disc=""
        isBtn="true"
        btnText="open"
        link={link}
        
      />              
    </div>
    
  </div></div>
  )
}

export default StudentList