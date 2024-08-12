import React from "react";
import Typography from "../../../components/Typography";
import { useTranslation } from "react-i18next";

const Instructions = ({ ref, instructions = [] }) => {
  const { t } = useTranslation();
  return (
    <div
      ref={ref}
      id="instructions"
      className="my-[6vh] flex h-full flex-col gap-3 px-4 dark:text-primary hd:flex-row hd:gap-0"
    >
      <Typography variant="h2" className="w-1/3 text-xl font-bold capitalize">
        {t("Instructions.title")}
      </Typography>
      <div className="h-full w-full text-xs hd:text-base">
        <ul className="flex flex-col gap-3">
          {instructions.map(({ number, en }, index) => (
            <li key={index}>
              <div className="flex w-full border-t border-gray-400 dark:border-primary">
                <Typography
                  className="min-w-10 border-r border-gray-400 !font-semibold dark:border-primary hd:min-w-20"
                  variant="body1"
                >
                  {number}
                </Typography>
                <Typography
                  className="ml-4 max-w-[80%] !font-light hd:ml-24"
                  variant="body1"
                >
                  {en}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
