import React from "react";
import Typography from "../../../components/Typography";
import { useTranslation } from "react-i18next";

const Equipment = ({ equipment = [] }) => {
  const { t } = useTranslation();
  return (
    <div
      id="equipment"
      className="my-[6vh] flex h-full flex-col gap-3 px-4 dark:text-primary hd:flex-row hd:gap-0"
    >
      <Typography variant="h2" className="w-1/3 text-xl font-bold capitalize">
        {t("equipment.title")}
      </Typography>
      <div className="flex h-full w-full flex-wrap gap-3">
        {equipment.map(({ image, name }, index) => (
          <div key={index}>
            <div className="flex items-center justify-start gap-1 hd:gap-5">
              <div className="flex h-16 w-16 hd:h-20 hd:w-20">
                <img
                  className="h-auto w-full object-contain"
                  src={image}
                  alt={name}
                />
              </div>
              <Typography
                variant="caption"
                className="text-sm !font-extralight capitalize hd:text-base"
              >
                {t(`Equipment.${name}`)}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
