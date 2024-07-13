import { Link } from "react-router-dom";
import Typography from "../../../../components/Typography";
import { ROUTES } from "../../../../constants";

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
    <section className="w-full flex flex-col justify-start items-start px-8 pt-48">
      <Typography
        className="text-slate-950 font-extrabold text-6xl mb-4"
        variant="h2"
      >
        Top Diets
      </Typography>
      <div className="w-full">
        <ul className="w-full flex justify-center items-center">
          {imageDiets.map(({ img, label }) => (
            <li className="w-1/4" key={label}>
              <Link
                to={`${ROUTES.RECIPES}?f=${label}`}
                className="flex-shrink-0 p-0 w-full"
              >
                <article className="w-full h-full flex flex-col items-start">
                  <div className="w-full h-[40rem] flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={img}
                      alt={label}
                    />
                  </div>
                  <Typography
                    className="text-slate-950 font-extrabold text-xl capitalize mt-2 flex justify-center items-center gap-2"
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
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DietsSection;
