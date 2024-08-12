import { useTranslation } from "react-i18next";

const DietTranslations = () => {
  const { t } = useTranslation();

  const dietTranslations = {
    "dairy free": t("DietsFilters.dairyFree"),
    "fodmap friendly": t("DietsFilters.fodmapFriendly"),
    "gluten free": t("DietsFilters.glutenFree"),
    ketogenic: t("DietsFilters.ketogenic"),
    "lacto ovo vegetarian": t("DietsFilters.lactoOvoVegetarian"),
    paleolithic: t("DietsFilters.paleolithic"),
    pescatarian: t("DietsFilters.pescatarian"),
    primal: t("DietsFilters.primal"),
    vegan: t("DietsFilters.vegan"),
    "whole 30": t("DietsFilters.whole30"),
  };

  return dietTranslations;
};

export default DietTranslations;
