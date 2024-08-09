import { useState } from "react";
import PropTypes from "prop-types";
import Typography from "../../../../../components/Typography";
import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";

const TeamCard = ({ urls, role, name, photo, skills, index }) => {
  const [showButtons, setshowButtons] = useState(false);

  const handleMouseEnter = () => {
    setshowButtons(true);
  };

  const handleMouseLeave = () => {
    setshowButtons(false);
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex h-full flex-col items-start justify-between border-t p-1 hd:w-1/3 hd:p-4 ${index === 0 && "border-r"} cursor-pointer border-gray-400 dark:border-primary`}
    >
      <div className="relative h-full w-full">
        {showButtons && (
          <div className="absolute z-10 flex h-full w-full items-center justify-evenly bg-primary/70 backdrop-grayscale-0">
            {urls.linkedin && (
              <a href={urls.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-12 w-12 hover:fill-accent md:h-24 md:w-24" />
              </a>
            )}
            {urls.github && (
              <a href={urls.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-12 w-12 hover:fill-accent md:h-24 md:w-24" />
              </a>
            )}
            {urls.gitlab && (
              <a href={urls.gitlab} target="_blank" rel="noopener noreferrer">
                <FaGitlab className="h-12 w-12 hover:fill-accent md:h-24 md:w-24" />
              </a>
            )}
          </div>
        )}
        <Typography
          className="text-[8px] dark:text-primary md:text-sm"
          variant="body2"
        >
          {role}
        </Typography>
        <Typography
          className="mb-8 text-xl font-extrabold dark:text-primary md:text-4xl"
          variant="h2"
        >
          {name}
        </Typography>
        <div className="mb-10 h-[15vh] flex-shrink-0 md:h-[30vh] hd:h-[50vh]">
          <img
            className="h-full w-full object-cover md:h-[30vh] hd:h-[50vh]"
            src={photo}
            style={{
              filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))",
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
        </div>
        <Typography
          className="text-[8px] dark:text-primary md:text-[11px]"
          variant="body2"
        >
          {skills}
        </Typography>
      </div>
    </article>
  );
};

TeamCard.propTypes = {
  urls: PropTypes.shape({
    linkedin: PropTypes.string,
    github: PropTypes.string,
    gitlab: PropTypes.string,
  }).isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
};

export default TeamCard;
