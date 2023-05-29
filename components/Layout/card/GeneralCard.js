import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const GeneralCard = ({ disc, title, btnText, link, btnProp, color }) => {

    // const [randomColor, setRandomColor] = useState("#035124")
    
    // var colors = [
    //   "#000",
    //   "#004042",
    //   "#035124",
    //   "#043f38",
    //   "#865658",
    //   "#7fc254",
    // ];

    // // selecting random color
    // setRandomColor( colors[Math.floor(Math.random() * colors.length)])

  return (
    <div>
      <div className="items-center w-full  overflow-hidden rounded-3xl shadow-lg min:h-fit justify-cente min:w-fit h-full">
        <div className="grid content-between grid-cols-1  font-bold text-center  text-white min-h-64  " style={{backgroundColor: color}} >
         
            <h2 className="text-5xl py-5 " style={{
                  fontFamily:
                    '"Geeza Pro", "Nadeem", "Al Bayan", "DecoType Naskh", "DejaVu Serif", "STFangsong", "STHeiti", "STKaiti", "STSong", "AB AlBayan", "AB Geeza", "AB Kufi", "DecoType Naskh", "Aldhabi", "Andalus", "Sakkal Majalla", "Simplified Arabic", "Traditional Arabic", "Arabic Typesetting", "Urdu Typesetting", "Droid Naskh", "Droid Kufi", "Roboto", "Tahoma", "Times New Roman", "Arial", serif',
                  fontWeight: 500,
                }}>{title}</h2>
            </div>
          <div className="bg-slate-50 h-fit">
          <div>
            <h2 className="py-2 text-sm text-dark-purple">{disc}</h2>
          </div>
          {link ? (
            <div>
              <Link
                href={link}
                className="px-10 py-1 m-2 text-white rounded-md bg-dark-purple"
              >
                {btnText}
              </Link>
            </div>
          ): null}
          {btnText ? (
            <div>
              <Button className="bg-teal-300">{btnText}{btnProp}</Button>
            </div>
          ): null}
        </div>
        
      </div>
    </div>
  );
};

export default GeneralCard;
