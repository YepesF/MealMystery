import { useTranslation } from "react-i18next";

const EquipmentTranslations = () => {
    const { t } = useTranslation();

    const equipmentTranslations = {
        "aluminum foil": t("Equipment.aluminumFoil"),
        "baking pan": t("Equipment.bakingPan"),
        "baking paper": t("Equipment.bakingPaper"),
        "baking sheet": t("Equipment.bakingSheet"),
        "blender": t("Equipment.blender"),
        "bowl": t("Equipment.bowl"),
        "colander": t("Equipment.colander"),
        "cutting board": t("Equipment.cuttingBoard"),
        "dutch oven": t("Equipment.dutchOven"),
        "food processor": t("Equipment.foodProcessor"),
        "frying pan": t("Equipment.fryingPan"),
        "grill": t("Equipment.grill"),
        "immersion blender": t("Equipment.immersionBlender"),
        "instant pot": t("Equipment.instantPot"),
        "kitchen twine": t("Equipment.kitchenTwine"),
        "knife": t("Equipment.knife"),
        "ladle": t("Equipment.ladle"),
        "loaf pan": t("Equipment.loafPan"),
        "measuring cup": t("Equipment.measuringCup"),
        "microwave": t("Equipment.microwave"),
        "mixing bowl": t("Equipment.mixingBowl"),
        "oven": t("Equipment.oven"),
        "paper towels": t("Equipment.paperTowels"),
        "peeler": t("Equipment.peeler"),
        "plastic wrap": t("Equipment.plasticWrap"),
        "pot": t("Equipment.pot"),
        "pressure cooker": t("Equipment.pressureCooker"),
        "roasting pan": t("Equipment.roastingPan"),
        "sauce pan": t("Equipment.saucePan"),
        "serrated knife": t("Equipment.serratedKnife"),
        "sieve": t("Equipment.sieve"),
        "slotted spoon": t("Equipment.slottedSpoon"),
        "slow cooker": t("Equipment.slowCooker"),
        "spatula": t("Equipment.spatula"),
        "stand mixer": t("Equipment.standMixer"),
        "stove": t("Equipment.stove"),
        "tongs": t("Equipment.tongs"),
        "whisk": t("Equipment.whisk"),
        "wooden spoon": t("Equipment.woodenSpoon"),
    };

    return equipmentTranslations;
};

export default EquipmentTranslations;
