import { useEffect, useState } from "react";
import { getDiets } from "../../../api/recepies";
import Typography from "../../Typography";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Checkbox,
} from "@material-tailwind/react";
import ArrowIcon from "./ArrowIcon";

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
    <Accordion open={dietsOpen} icon={<ArrowIcon open={dietsOpen} />}>
      <AccordionHeader
        className="text-base font-bold text-primaryDark dark:text-primary"
        onClick={() => {
          setDietsOpen(!dietsOpen);
          setShowAllDiets(false);
        }}
      >
        Diets
      </AccordionHeader>
      <AccordionBody>
        {(showAllDiets ? diets : diets.slice(0, 4)).map((diet, index) => (
          <div key={index} className="mb-4 flex items-center">
            <Checkbox
              color="orange"
              className="h-5 w-5 border-accent bg-accent/15 transition-all hover:scale-105 hover:before:opacity-0"
              ripple={false}
              value={diet}
              checked={selectedDiets.includes(diet)}
              onChange={({ target }) => handleSelectedDiets(target.value)}
              label={
                <Typography
                  variant="caption"
                  className="ml-1 capitalize dark:text-primary"
                >
                  {diet}
                </Typography>
              }
              containerProps={{ className: "p-0" }}
            />
          </div>
        ))}
        <div className="w-full">
          {showAllDiets ? (
            <div
              className="cursor-pointer hover:text-accent dark:text-primary/90"
              onClick={() => setShowAllDiets(false)}
            >
              - View Less
            </div>
          ) : (
            diets.length > 4 && (
              <div
                className="cursor-pointer hover:text-accent dark:text-primary/90"
                onClick={() => setShowAllDiets(true)}
              >
                + View More
              </div>
            )
          )}
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default DietsFilters;
