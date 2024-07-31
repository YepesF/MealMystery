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
        className="font-bold text-base text-black"
        onClick={() => {
          setDietsOpen(!dietsOpen);
          setShowAllDiets(false);
        }}
      >
        Diets
      </AccordionHeader>
      <AccordionBody>
        {(showAllDiets ? diets : diets.slice(0, 4)).map((diet, index) => (
          <div key={index} className="flex items-center mb-4">
            <Checkbox
              color="orange"
              className="h-5 w-5 border-accent bg-accent/15 transition-all hover:scale-105 hover:before:opacity-0"
              ripple={false}
              value={diet}
              checked={selectedDiets.includes(diet)}
              onChange={({ target }) => handleSelectedDiets(target.value)}
              label={
                <Typography variant="caption" className="capitalize ml-1">
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
              className="cursor-pointer hover:text-accent"
              onClick={() => setShowAllDiets(false)}
            >
              - View Less
            </div>
          ) : (
            diets.length > 4 && (
              <div
                className="cursor-pointer hover:text-accent"
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
