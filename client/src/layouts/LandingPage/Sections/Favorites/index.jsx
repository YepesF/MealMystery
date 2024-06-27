import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../../components/Typography";
import Button from "../../../../components/Button";
import Badge from "../../../../components/Badge";

const Favorites = (props) => {
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
    <section className="w-full flex flex-col justify-start items-start px-8 pt-48">
      <div className="flex items-center justify-center gap-8 mb-4">
        <Typography
          className="text-slate-950 font-extrabold text-6xl"
          variant="h2"
        >
          Favorites
        </Typography>
        <div className="flex items-center justify-center gap-2">
          <Button size="small">Users</Button>
          <Button size="small">Sponacular</Button>
          <Button size="small">Health</Button>
        </div>
      </div>
      <div className="w-full overflow-x-auto hide-scrollbar">
        <ul className="flex justify-start items-center">
          {imageDiets.map(({ img, label }, index) => (
            <li
              className="flex-shrink-0 w-1/3"
              key={index}
              style={{ minWidth: "33%" }}
            >
              <article
                className={`h-full p-4 border-t ${index < imageDiets.length - 1 ? "border-r" : ""} border-current`}
              >
                <button className="w-full h-full flex flex-col items-start">
                  <div className="mb-10">
                    <div>
                      <Typography
                        className="text-slate-950 font-extrabold text-xl"
                        variant="body1"
                      >
                        {label}
                      </Typography>
                      <Typography
                        className="text-slate-950 text-xs text-start"
                        variant="body1"
                      >
                        {label}
                      </Typography>
                    </div>
                  </div>
                  <div className="w-full h-[40rem] flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={img}
                      alt={label}
                    />
                  </div>
                  <Badge className="mt-10">User</Badge>
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Favorites.propTypes = {};

export default Favorites;
