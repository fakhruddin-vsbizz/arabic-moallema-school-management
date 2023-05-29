import React from 'react'

const FullCard = ({title, title2, disc, btn, comp}) => {
  return (
    <div >
        <div className="mx-10  bg-white p-16 rounded-md text-center text-dark-purple h-full ">
            <h1 className='text-9xl pb-5 my-2'>{title}</h1>
            <h1 className='text-3xl mt-5'>{title2}</h1>
            <p className='py-5 text-lg font-medium'>{disc}</p>
            {comp}
            {btn}
        </div>
    </div>
  )
}

export default FullCard