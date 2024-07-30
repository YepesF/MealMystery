import { Spinner } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import Typography from "../../../components/Typography";
import Badge from "../../../components/Badge";

const Recommend = ({ loading, recipes }) => {
  return (
    <div id="recommend" className="w-full min-h-[50rem] my-[6vh]">
      {loading && (
        <div className="flex justify-center items-center h-[40rem]">
          <Spinner color="red" className="h-16 w-16 text-accent" />
        </div>
      )}
      <div className="h-full flex justify-start items-center">
        {!loading &&
          recipes.map(
            ({ id, image, title, ready_in_minutes, diets }, index) => (
              <Link
                key={index}
                to={`${ROUTES.RECIPE}/${id}`}
                className="flex-shrink-0 p-0 w-1/3"
              >
                <article
                  className={`h-full p-4 border-t ${index < recipes.length - 1 ? "border-r" : ""} border-gray-400 px-4 bg-primary flex flex-col items-start justify-start gap-6`}
                >
                  <div className="w-full">
                    <Typography
                      variant="body1"
                      className="text-slate-950 font-extrabold text-xl overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-slate-600 capitalize"
                    >
                      Ready in minutes:{" "}
                      <strong className="text-accent ml-2">
                        {ready_in_minutes}
                      </strong>
                    </Typography>
                  </div>
                  <div className="w-full h-[40rem] flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={image}
                      alt={title}
                    />
                  </div>
                  <div className="flex justify-center h-full">
                    {diets.length ? (
                      diets.slice(0, 3).map((diet, index) => (
                        <Badge
                          key={index}
                          className={`capitalize ${index > 0 && "ml-4"}`}
                        >
                          {diet}
                        </Badge>
                      ))
                    ) : (
                      <Badge className="h-full opacity-0">&nbsp;</Badge>
                    )}
                  </div>{" "}
                </article>
              </Link>
            )
          )}
      </div>
    </div>
  );
};

export default Recommend;
