import { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Input,
} from "@material-tailwind/react";
import ArrowIcon from "./ArrowIcon";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";

const ReadyInMinutesFilters = ({ handleRangeChange, setReadyInMinutes }) => {
  const [timeOpen, setTimeOpen] = useState(false);
  const [range, setRange] = useState({ from: null, to: null });
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setRange({ ...range, [name]: value });
  };
  return (
    <Accordion open={timeOpen} icon={<ArrowIcon open={timeOpen} />}>
      <AccordionHeader
        className="font-bold text-base text-black"
        onClick={() => setTimeOpen(!timeOpen)}
      >
        Recipe Time
      </AccordionHeader>
      <AccordionBody>
        <form
          onSubmit={() => handleRangeChange(setReadyInMinutes, range)}
          className="flex justify-center items-center gap-3"
        >
          <Input
            size="md"
            variant="outlined"
            label="From"
            placeholder="From"
            type="number"
            color="green"
            icon={<MdOutlineAccessTime />}
            onChange={handleOnChange}
            name="from"
            value={range.from}
            required
          />
          <Input
            size="md"
            variant="outlined"
            label="To"
            placeholder="To"
            type="number"
            color="green"
            icon={<MdOutlineAccessTime />}
            onChange={handleOnChange}
            name="to"
            value={range.to}
            required
          />
          <button
            className="bg-primary border-secondary border hover:bg-secondary hover:fill-primary rounded-full p-2 text-secondary hover:text-primary"
            type="submit"
          >
            <GrFormNextLink className="" />
          </button>
        </form>
        <span>
          <strong className="text-secondary">*</strong>Time in minutes.
        </span>
      </AccordionBody>
    </Accordion>
  );
};

export default ReadyInMinutesFilters;
