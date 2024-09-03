import felipe from "../public/images/Felipe.webp";
import santiago from "../public/images/Santiago.jpg";
import { useTranslation } from "react-i18next";

const useTeamData = () => {
  const { t } = useTranslation();

  return [
    {
      role: t("TeamData.fullStackDeveloper"),
      name: "Felipe Yepes",
      photo: felipe,
      skills: t("TeamData.felipeSkills"),
      urls: {
        linkedin: "https://www.linkedin.com/in/yepesf",
        github: "https://github.com/YepesF",
        gitlab: "https://gitlab.com/YepileF",
      },
    },
    {
      role: t("TeamData.fullStackDeveloper"),
      name: "Santiago Aguirre",
      photo:
        santiago,
      skills: t("TeamData.santiagoSkills"),
      urls: {
        linkedin: "https://www.linkedin.com/in/santiagogarces01",
        github: "https://github.com/SantiagoGarces96",
      },
    },
  ];
};

export default useTeamData;