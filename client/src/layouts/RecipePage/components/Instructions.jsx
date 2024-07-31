import React from "react";
import Typography from "../../../components/Typography";

const Instructions = ({ ref, instructions = [] }) => {
  return (
    <div ref={ref} id="instructions" className="h-full px-4 my-[6vh] flex">
      <Typography variant="h2" className="w-1/3 text-xl font-bold capitalize">
        Instructions
      </Typography>
      <div className="h-full w-full">
        <ul className="flex flex-col gap-3">
          {instructions.map(({ number, step }, index) => (
            <li key={index}>
              <div className="w-full border-t border-gray-400 flex">
                <Typography
                  className="min-w-20 border-gray-400 border-r !font-semibold"
                  variant="body1"
                >
                  {number}
                </Typography>
                <Typography
                  className="max-w-[80%] border-gray-400 ml-24 !font-light"
                  variant="body1"
                >
                  {step}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
