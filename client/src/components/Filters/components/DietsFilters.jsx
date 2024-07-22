import { useEffect, useState } from "react";
import { getDiets } from "../../../api/recepies";
import Typography from "../../Typography";
import { Checkbox } from "@material-tailwind/react";

const DietsFilters = ({ selectedDiets, handleSelectedDiets }) => {
  const [dietsOpen, setDietsOpen] = useState(false);
  const [showAllDiets, setShowAllDiets] = useState(false);
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const data = await getDiets();
        setDiets(data);
      } catch (error) {
        console.error("Error fetching diets:", error);
      }
    };

    fetchDiets();
  }, []);

  return (
    <fieldset className="border-b">
      <details>
        <summary
          className="flex justify-between items-center cursor-pointer py-3 px-4"
          onClick={() => setDietsOpen(!dietsOpen)}
        >
          <Typography variant="h4">Diets</Typography>
        </summary>
        <ul className={`space-y-1 py-3 px-4 ${dietsOpen ? "block" : "hidden"}`}>
          {(showAllDiets ? diets : diets.slice(0, 4)).map((diet, index) => (
            <li key={index} className="flex items-center py-2">
              <Checkbox
                color="green"
                className="h-5 w-5 rounded-full border-secondary bg-secondary/15 transition-all hover:scale-105 hover:before:opacity-0"
                ripple={false}
                value={diet}
                checked={selectedDiets.includes(diet)}
                onChange={({ target }) => handleSelectedDiets(target.value)}
                label={
                  <Typography
                    variant="caption"
                    className="capitalize !font-light"
                  >
                    {diet}
                  </Typography>
                }
              />
            </li>
          ))}
        </ul>
        <div className=" px-4">
          {showAllDiets ? (
            <summary
              className="cursor-pointer text-green-600"
              onClick={() => setShowAllDiets(false)}
            >
              See Less
            </summary>
          ) : (
            diets.length > 4 && (
              <summary
                className="cursor-pointer text-green-600"
                onClick={() => setShowAllDiets(true)}
              >
                View More
              </summary>
            )
          )}
        </div>
      </details>
    </fieldset>
  );
};

export default DietsFilters;
