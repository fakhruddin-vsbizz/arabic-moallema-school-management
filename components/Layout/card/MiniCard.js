import React from 'react'
import Link from "next/link";

const MiniCard = ({ disc, title, isBtn, btnText, link }) => {
    const btn = isBtn || false
    return (
      <div>
        <div className="items-center p-5 overflow-hidden rounded-md shadow-lg min:h-fit min-w-60 justify-cente min:w-fit bg-slate-50">
          <div className="grid content-between grid-cols-1 gap-4 font-bold text-center text-dark-purple">
            <div>
              <h2 className="text-2xl ">{title}</h2>
            </div>
            <div>
              <h2 className="py-2 text-lg">{disc}</h2>
            </div>
            {btn &&  (<div>
              <Link
                href={link}
                className="px-10 py-1 m-2 text-white rounded-md bg-dark-purple hover:bg-green-700  "
              >
                {btnText}
              </Link>
            </div>)}
          </div>
        </div>
      </div>
    );
}

export default MiniCard