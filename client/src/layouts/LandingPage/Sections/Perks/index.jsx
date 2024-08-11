import Typography from "../../../../components/Typography";
import { useTranslation } from "react-i18next";

const Perks = () => {
  const { t } = useTranslation();
  const list = [
    t("Perks.WideRangeOfRecipes"),
    t("Perks.HighQualityIngredients"),
    t("Perks.IndividualCookingTips"),
    t("Perks.ProfessionalCookingTechniques"),
    t("Perks.EasyToFollowInstructions"),
    t("Perks.PersonalizedRecipeRecommendations"),
  ];
  return (
    <section className="mt-32 w-full bg-perks bg-cover bg-no-repeat saturate-[.75] hd:mt-48 hd:h-screen hd:bg-fixed">
      <div className="h-full w-full px-2 py-5 hd:px-8 hd:py-24">
        <div className="h-3 bg-primary hd:h-6"></div>
        <div className="my-8 flex h-full flex-col justify-between hd:py-16">
          <div className="px-6">
            <Typography className="w-full font-extrabold" variant="h2">
              <Typography
                className="text-center text-6xl text-primary md:text-[7rem] hd:text-10xl"
                variant="body1"
              >
                {t("Perks.Your")}
              </Typography>
              <Typography
                className="text-start text-6xl text-primary md:text-[7rem] hd:text-10xl"
                variant="body1"
              >
                {t("Perks.Recipe")}
              </Typography>
              <Typography
                className="text-end text-6xl text-primary md:text-[7rem] hd:text-10xl"
                variant="body1"
              >
                {t("Perks.Experience")}
              </Typography>
            </Typography>
          </div>
          <div className="mt-16 flex w-full flex-col-reverse gap-14 md:flex-row md:justify-between">
            <div className="w-full">
              <Typography
                className="!font-extralight text-primary hd:w-1/4"
                variant="body2"
              >
                {t("Perks.Description")}
              </Typography>
            </div>
            <div className="w-full">
              <ul className="flex flex-col gap-3">
                {list.map((el, index) => (
                  <li key={index}>
                    <div className="flex border-t">
                      <Typography
                        className="w-10 border-r border-primary font-extrabold text-primary hd:w-1/4 hd:text-2xl"
                        variant="body1"
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        className="ml-5 border-primary text-base font-extrabold text-primary hd:ml-24 hd:text-2xl"
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
