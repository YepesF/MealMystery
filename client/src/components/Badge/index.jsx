import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import DietTranslations from "../../utils/translations/translation/dietTranslations";

const Badge = ({ children, className = "", ...props }) => {
  const { t, i18n } = useTranslation();
  const dietTranslations = DietTranslations();
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gray-400 px-2 py-1 text-[7px] font-bold text-gray-700 hover:border-transparent hover:bg-accent hover:text-primary dark:border-accent dark:text-accent dark:hover:text-primary md:text-xs ${className}`}
      {...props}
    >
      {i18n.language === "en"
        ? children
        : dietTranslations[children] || children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Badge;
