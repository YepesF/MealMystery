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
    <section className="mt-32 w-full bg-perks bg-cover bg-no-repeat saturate-[.75] md:mt-48 md:h-[120vh] 2k:h-screen 2k:bg-fixed">
      <div className="h-full w-full px-2 py-5 md:px-8 md:py-24">
        <div className="h-3 bg-primary md:h-6"></div>
        <div className="my-8 flex h-full flex-col justify-between md:py-16">
          <div className="px-6">
            <Typography className="w-full font-extrabold" variant="h2">
              <Typography
                className="text-center text-6xl text-primary md:text-10xl"
                variant="body1"
              >
                Your
              </Typography>
              <Typography
                className="text-start text-6xl text-primary md:text-10xl"
                variant="body1"
              >
                Recipe®
              </Typography>
              <Typography
                className="text-end text-6xl text-primary md:text-10xl"
                variant="body1"
              >
                Experience
              </Typography>
            </Typography>
          </div>
          <div className="mt-16 flex w-full flex-col-reverse gap-14 md:flex-row md:justify-between">
            <div className="w-full">
              <Typography
                className="!font-extralight text-primary md:w-1/4"
                variant="body2"
              >
                With our passion and enthusiasm for cooking, we offer
                high-quality and exceptional recipes for chefs of all levels.
              </Typography>
            </div>
            <div className="w-full">
              <ul className="flex flex-col gap-3">
                {list.map((el, index) => (
                  <li key={index}>
                    <div className="flex border-t">
                      <Typography
                        className="w-10 border-r border-primary font-extrabold text-primary md:w-1/4 md:text-2xl"
                        variant="body1"
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        className="ml-5 border-primary text-base font-extrabold text-primary md:ml-24 md:text-2xl"
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
