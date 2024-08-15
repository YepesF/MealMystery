import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Input,
} from "@material-tailwind/react";
import ArrowIcon from "./ArrowIcon";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const ReadyInMinutesFilters = ({
  handleRangeChange,
  readyInMinutes,
  setReadyInMinutes,
}) => {
  const { t } = useTranslation();
  const [timeOpen, setTimeOpen] = useState(false);
  const [range, setRange] = useState({ from: "", to: "" });
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setRange({ ...range, [name]: value });
  };

  useEffect(() => {
    if (readyInMinutes.from === 0 && readyInMinutes.to === 0) {
      setRange({ from: "", to: "" });
    }
  }, [readyInMinutes, setRange]);

  return (
    <Accordion open={timeOpen} icon={<ArrowIcon open={timeOpen} />}>
      <AccordionHeader
        className="text-base font-bold text-black dark:text-primary"
        onClick={() => setTimeOpen(!timeOpen)}
      >
        {t("ReadyInMinutesFilters.recipeTime")}
      </AccordionHeader>
      <AccordionBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRangeChange(setReadyInMinutes, range);
          }}
          className="flex w-full flex-col items-center justify-start gap-3 px-2 hd:mb-4 hd:flex-row"
        >
          <Input
            containerProps={{
              className: "!min-w-1 !w-full",
            }}
            size="md"
            variant="outlined"
            label={t("ReadyInMinutesFilters.from")}
            placeholder={t("ReadyInMinutesFilters.from")}
            type="number"
            color="orange"
            icon={<MdOutlineAccessTime />}
            onChange={handleOnChange}
            name="from"
            value={range.from}
            required
          />
          <Input
            containerProps={{
              className: "!min-w-1 !w-full",
            }}
            size="md"
            variant="outlined"
            label={t("ReadyInMinutesFilters.to")}
            placeholder={t("ReadyInMinutesFilters.to")}
            type="number"
            color="orange"
            icon={<MdOutlineAccessTime />}
            onChange={handleOnChange}
            name="to"
            value={range.to}
            required
          />
          <button
            className="rounded-full border border-accent bg-primary p-2 text-accent hover:bg-accent hover:fill-primary hover:text-primary dark:bg-primaryDark dark:hover:border-transparent dark:hover:bg-accent"
            type="submit"
          >
            <GrFormNextLink className="" />
          </button>
        </form>
        <span className="dark:text-primary/90">
          <strong className="text-accent">*</strong>
          {t("ReadyInMinutesFilters.timeInMinutes")}
        </span>
      </AccordionBody>
    </Accordion>
  );
};

export default ReadyInMinutesFilters;
