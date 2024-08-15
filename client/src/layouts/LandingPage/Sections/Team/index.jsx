import { useState } from "react";
import Typography from "../../../../components/Typography";
import useTeamData from "../../../../data";
import TeamCard from "./components/TeamCard";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();
  const teamData = useTeamData();
  const [renderTeam] = useState(
    teamData.map((person, index) => (
      <TeamCard key={index} index={index} {...person} />
    )),
  );
  return (
    <section className="flex w-full flex-col items-start justify-start px-2 pt-20 md:px-4 md:pt-32 hd:px-6 hd:pt-40 fhd:px-8 fhd:pt-48">
      <Typography
        className="mb-4 text-2xl font-extrabold dark:text-primary md:text-4xl hd:text-5xl fhd:text-6xl"
        variant="h2"
      >
        {t("Team.developersTeam")}
      </Typography>
      <div className="flex">{renderTeam}</div>
    </section>
  );
};

export default Team;
