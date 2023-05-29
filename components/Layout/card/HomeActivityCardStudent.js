import React from "react";
import Link from "next/link";
const HomeActivityCardStudent = ({ name, title, letter, link }) => {
    const nameHandler = () => {
        letter(title);
      };
      return (
        <div>
          <div className=" max-w-32 max-h-26 mt-6 rounded overflow-hidden shadow-lg mr-4  items-center justify-center bg-slate-50 py-2 ">
            <Link
              href={`${link}/${title}/${0}`}
              onClick={nameHandler}
              className="font-extrabold text-center text-dark-purple"
            >
              <h2 className="  text-4xl">{name}</h2>
              <h2 className="pt-2  text-lg">{title}</h2>
            </Link>
          </div>
        </div>
      );
}

export default HomeActivityCardStudent
