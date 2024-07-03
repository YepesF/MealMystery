import { useState } from "react";
import PropTypes from "prop-types";
import Typography from "../../../../../components/Typography";

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
      className={`w-1/3 h-full p-4 text-slate-950 flex flex-col justify-between items-start border-t ${index === 0 && "border-r"} border-current cursor-pointer`}
    >
      <div className="w-full h-full relative">
        {showButtons && (
          <div className="w-full h-full flex items-center justify-evenly backdrop-grayscale-0 bg-primary/70 absolute z-10">
            {urls.linkedin && (
              <a href={urls.linkedin} target="_blank" rel="noopener noreferrer">
                <svg
                  className="fill-slate-950 hover:fill-secondary"
                  width="96px"
                  height="96px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z" />
                </svg>
              </a>
            )}
            {urls.github && (
              <a href={urls.github} target="_blank" rel="noopener noreferrer">
                <svg
                  className="fill-slate-950 hover:fill-secondary"
                  viewBox="0 0 1024 1024"
                  width="96px"
                  height="96px"
                >
                  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                </svg>
              </a>
            )}
            {urls.gitlab && (
              <a href={urls.gitlab} target="_blank" rel="noopener noreferrer">
                <svg
                  className="fill-slate-950 hover:fill-secondary"
                  width="96px"
                  height="96px"
                  viewBox="0 -1 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12.906 24-12.503-9.277c-.162-.128-.284-.3-.351-.497l-.002-.008c-.032-.09-.05-.193-.05-.301s.018-.211.052-.308l-.002.007 1.463-4.437zm-7.613-23.646 2.874 8.823h-6.655l2.823-8.823c.07-.207.263-.353.49-.353h.015-.001c.008 0 .017-.001.026-.001.212 0 .388.151.427.351v.003zm2.874 8.823h9.479l-4.739 14.823zm17.595 4.436c.032.09.05.193.05.301s-.018.211-.052.308l.002-.007c-.069.205-.191.376-.351.503l-.002.002-12.503 9.28 11.394-14.823zm-4.285-13.259 2.823 8.823h-6.655l2.874-8.823c.04-.203.216-.354.428-.354.009 0 .018 0 .027.001h-.001.014c.227 0 .419.146.489.349l.001.004z" />
                </svg>
              </a>
            )}
          </div>
        )}
        <Typography className="text-sm" variant="body2">
          {role}
        </Typography>
        <Typography
          className="text-slate-950 font-extrabold text-4xl mb-8"
          variant="h2"
        >
          {name}
        </Typography>
        <div className="h-[50vh] mb-2">
          <img
            className="h-full object-cover"
            src={photo}
            style={{
              filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))",
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
        </div>
        <Typography className="text-sm" variant="body2">
          {skills}
        </Typography>
      </div>
    </article>
  );
};

TeamCard.propTypes = {
  urls: PropTypes.shape({
    linkedin: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    gitlab: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
};

export default TeamCard;
