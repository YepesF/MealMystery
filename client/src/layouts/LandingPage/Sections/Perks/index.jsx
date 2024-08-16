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
    <section className="mt-32 w-full bg-perks bg-cover bg-no-repeat saturate-[.75] fhd:mt-48 fhd:h-screen fhd:bg-fixed">
      <div className="h-full w-full px-2 py-5 fhd:px-8 fhd:py-24">
        <div className="h-3 bg-primary fhd:h-6"></div>
        <div className="my-8 flex h-full flex-col items-center justify-between fhd:py-16">
          <div className="flex w-full flex-col items-center justify-center px-6 hd:max-w-[90%] fhd:max-w-[70%]">
            <Typography
              className="w-full text-center text-6xl font-extrabold text-primary md:text-[7rem] md:leading-[10rem] hd:text-[11rem] fhd:text-[12rem] 2k:text-[13rem]"
              variant="body1"
            >
              {t("Perks.Your")}
            </Typography>
            <Typography
              className="w-full text-start text-6xl font-extrabold text-primary md:text-[7rem] md:leading-[10rem] hd:text-[11rem] fhd:text-[12rem] 2k:text-[13rem]"
              variant="body1"
            >
              {t("Perks.Recipe")}
            </Typography>
            <Typography
              className="w-full text-end text-6xl font-extrabold text-primary md:text-[7rem] md:leading-[10rem] hd:text-[11rem] fhd:text-[12rem] 2k:text-[13rem]"
              variant="body1"
            >
              {t("Perks.Experience")}
            </Typography>
          </div>
          <div className="mt-16 flex w-full flex-col-reverse gap-14 md:flex-row md:justify-between">
            <div className="w-full">
              <Typography
                className="!font-extralight text-primary hd:w-1/3 2k:w-1/4"
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
                        className="w-10 border-r border-primary font-extrabold text-primary hd:w-1/3 hd:text-xl fhd:w-1/4 2k:text-2xl"
                        variant="body1"
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        className="ml-5 border-primary text-base font-extrabold text-primary fhd:ml-24 2k:text-2xl"
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
