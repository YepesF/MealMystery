import { useState } from "react";
import Typography from "../../../../components/Typography";
import { teamData } from "../../../../data";
import TeamCard from "./components/TeamCard";

const Team = () => {
  const [renderTeam] = useState(
    teamData.map((person, index) => (
      <TeamCard key={index} index={index} {...person} />
    )),
  );
  return (
    <section className="flex w-full flex-col items-start justify-start px-2 pt-20 md:px-4 md:pt-32 hd:px-8 hd:pt-48">
      <Typography
        className="mb-4 text-2xl font-extrabold dark:text-primary md:text-4xl hd:text-6xl"
        variant="h2"
      >
        Developers Team
      </Typography>
      <div className="flex">{renderTeam}</div>
    </section>
  );
};

export default Team;
