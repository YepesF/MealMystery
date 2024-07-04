import { useState } from "react";
import Typography from "../../../../components/Typography";
import { teamData } from "../../../../data";
import TeamCard from "./components/TeamCard";

const Team = () => {
  const [renderTeam] = useState(
    teamData.map((person, index) => (
      <TeamCard key={index} index={index} {...person} />
    ))
  );
  return (
    <section className="w-full flex flex-col justify-start items-start px-8 py-48">
      <Typography
        className="text-slate-950 font-extrabold text-6xl mb-48"
        variant="h2"
      >
        Developers Team
      </Typography>
      <div className="flex">{renderTeam}</div>
    </section>
  );
};

export default Team;
