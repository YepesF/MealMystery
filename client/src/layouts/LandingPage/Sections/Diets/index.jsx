import { Link } from "react-router-dom";
import Typography from "../../../../components/Typography";
import { ROUTES } from "../../../../constants";
import { GrFormNextLink } from "react-icons/gr";

const DietsSection = () => {
  const imageDiets = [
    {
      img: "https://images.unsplash.com/photo-1623428324402-f08042fd423d?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGFpcnklMjBGcmVlfGVufDB8fDB8fHwy",
      label: "gluten free",
    },
    {
      img: "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=2485&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "ketogenic",
    },
    {
      img: "https://images.unsplash.com/photo-1638740531453-9b02a1eeb0c0?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "pescatarian",
    },
    {
      img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      label: "vegan",
    },
  ];
  return (
    <section className="flex w-full flex-col items-start justify-start px-2 pt-20 md:px-4 md:pt-32 hd:px-8 hd:pt-48">
      <Typography
        className="mb-4 text-2xl font-extrabold dark:text-primary md:text-4xl hd:text-6xl"
        variant="h2"
      >
        Top Diets
      </Typography>
      <div className="w-full">
        <div className="flex [&:hover>div>a>img]:saturate-[.40] [&:hover>div]:w-1/4 [&>div:hover]:w-1/3 [&>div>a>img:hover]:saturate-100">
          {imageDiets.map(({ img, label }, index) => {
            return (
              <div
                key={index}
                className="group relative h-[22rem] w-1/4 cursor-pointer overflow-hidden transition-all duration-500 md:h-[32rem] hd:h-[50rem]"
              >
                <Link to={`${ROUTES.RECIPES}?diet=${label}`} className="">
                  <img
                    className="h-[90%] w-full object-cover transition-all group-hover:scale-x-105"
                    src={img}
                    alt={label}
                  />
                  <Typography
                    className="mt-2 flex items-center justify-start gap-1 text-xs font-extrabold capitalize dark:text-primary md:gap-2 md:text-xl"
                    variant="body1"
                  >
                    {label}
                    <GrFormNextLink />
                  </Typography>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DietsSection;
