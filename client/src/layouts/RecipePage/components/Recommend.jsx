import { Spinner } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import Typography from "../../../components/Typography";
import Badge from "../../../components/Badge";

const Recommend = ({ loading, recipes }) => {
  return (
    <div id="recommend" className="my-[6vh] min-h-[50rem] w-full">
      {loading && (
        <div className="flex h-[40rem] items-center justify-center">
          <Spinner color="red" className="h-16 w-16 text-accent" />
        </div>
      )}
      <div className="h-full w-full">
        <Typography
          className="text-ellipsis whitespace-nowrap p-4 text-6xl font-extrabold capitalize"
          variant="h2"
        >
          We recommend for you
        </Typography>
        <div className="flex h-full items-center justify-start">
          {!loading &&
            recipes.map(
              ({ id, image, title, ready_in_minutes, diets }, index) => (
                <Link
                  key={index}
                  to={`${ROUTES.RECIPE}/${id}`}
                  className="w-1/3 flex-shrink-0 p-0"
                >
                  <article
                    className={`h-full border-t p-4 ${index < recipes.length - 1 ? "border-r" : ""} flex flex-col items-start justify-start gap-6 border-gray-400 bg-primary px-4`}
                  >
                    <div className="w-full">
                      <Typography
                        variant="body1"
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-extrabold"
                      >
                        {title}
                      </Typography>
                      <Typography variant="body1" className="capitalize">
                        Ready in minutes:{" "}
                        <strong className="ml-2 text-accent">
                          {ready_in_minutes}
                        </strong>
                      </Typography>
                    </div>
                    <div className="h-[40rem] w-full flex-shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        src={image}
                        alt={title}
                      />
                    </div>
                    <div className="flex h-full justify-center">
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
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
