import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../../components/Typography";

const DietsSection = (props) => {
  const imageDiets = [
    {
      img: "https://images.unsplash.com/photo-1559852925-a9b83b8387d0?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "Paleo",
    },
    {
      img: "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=2485&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "Ketogenic",
    },
    {
      img: "https://images.unsplash.com/photo-1542814880-7e62cf14b7c8?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "Vegetarian",
    },
    {
      img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "Vegan",
    },
  ];
  return (
    <section className="w-full flex flex-col justify-start items-start px-8 py-48">
      <Typography
        className="text-slate-950 font-extrabold text-6xl mb-4"
        variant="h2"
      >
        Top Diets
      </Typography>
      <div>
        <ul className="flex justify-center items-center">
          {imageDiets.map(({ img, label }) => (
            <li className="w-1/4" key={label}>
              <article className="h-full">
                <button className="w-full h-full flex flex-col items-start">
                  <div className="w-full h-[60rem] flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={img}
                      alt={label}
                    />
                  </div>
                  <Typography
                    className="text-slate-950 font-extrabold text-xl mt-2 flex justify-center items-center gap-2"
                    variant="body1"
                  >
                    {label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="#5f6368"
                    >
                      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                    </svg>
                  </Typography>
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

DietsSection.propTypes = {};

export default DietsSection;
