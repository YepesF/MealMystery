import Typography from "../../../../components/Typography";

const Perks = () => {
  const list = [
    "Wide range of recipes",
    "High-quality ingredients",
    "Individual cooking tips",
    "Professional cooking techniques",
    "Easy-to-follow instructions",
    "Personalized recipe recommendations",
  ];
  return (
    <section className="w-full h-[120vh] bg-perks bg-no-repeat bg-cover mt-48">
      <div className="h-full w-full px-8 py-24">
        <div className="bg-white h-6"></div>
        <div className="h-full flex justify-between flex-col py-16">
          <div className="px-96">
            <Typography className="font-extrabold w-full" variant="h2">
              <Typography className="text-10xl text-center" variant="body1">
                Your
              </Typography>
              <Typography className="text-10xl text-start" variant="body1">
                Recipe®
              </Typography>
              <Typography className="text-10xl text-end" variant="body1">
                Experience
              </Typography>
            </Typography>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-full">
              <Typography className="w-1/4" variant="body2">
                With our passion and enthusiasm for cooking, we offer
                high-quality and exceptional recipes for chefs of all levels.
              </Typography>
            </div>
            <div className="w-full">
              <ul className="flex flex-col gap-3">
                {list.map((el, index) => (
                  <li key={index}>
                    <div className="border-t flex">
                      <Typography
                        className="w-1/4 border-r font-extrabold text-2xl"
                        variant="body1"
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        className="ml-24 font-extrabold text-2xl"
                        variant="body1"
                      >
                        {el}
                      </Typography>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perks;
