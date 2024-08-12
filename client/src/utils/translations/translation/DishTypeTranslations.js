import { useTranslation } from "react-i18next";

const DishTypeTranslations = () => {
    const { t } = useTranslation();

    const dishTypeTranslations = {
        antipasti: t("DishTypes.antipasti"),
        antipasto: t("DishTypes.antipasto"),
        appetizer: t("DishTypes.appetizer"),
        beverage: t("DishTypes.beverage"),
        bread: t("DishTypes.bread"),
        breakfast: t("DishTypes.breakfast"),
        brunch: t("DishTypes.brunch"),
        condiment: t("DishTypes.condiment"),
        dinner: t("DishTypes.dinner"),
        dip: t("DishTypes.dip"),
        drink: t("DishTypes.drink"),
        fingerfood: t("DishTypes.fingerfood"),
        "hor d'oeuvre": t("DishTypes.horDoeuvre"),
        lunch: t("DishTypes.lunch"),
        "main course": t("DishTypes.mainCourse"),
        "main dish": t("DishTypes.mainDish"),
        "morning meal": t("DishTypes.morningMeal"),
        salad: t("DishTypes.salad"),
        sauce: t("DishTypes.sauce"),
        "side dish": t("DishTypes.sideDish"),
        snack: t("DishTypes.snack"),
        soup: t("DishTypes.soup"),
        spread: t("DishTypes.spread"),
        starter: t("DishTypes.starter"),
    };

    return dishTypeTranslations;
};

export default DishTypeTranslations;
