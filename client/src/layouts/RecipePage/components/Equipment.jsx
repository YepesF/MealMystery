import React from "react";
import Typography from "../../../components/Typography";

const Equipment = ({ equipment = [] }) => {
  return (
    <div className="h-full px-4 my-[6vh] flex">
      <Typography variant="h2" className="w-1/3 text-xl font-bold capitalize">
        Equipment
      </Typography>
      <div className="h-full w-full flex flex-wrap gap-3">
        {equipment.map(({ image, name }, index) => (
          <div key={index}>
            <div className="flex justify-start items-center gap-5">
              <div className="w-20 h-20 flex">
                <img
                  className="w-full h-auto object-contain"
                  src={image}
                  alt={name}
                />
              </div>
              <Typography
                variant="h2"
                className="text-md !font-extralight capitalize"
              >
                {name}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
