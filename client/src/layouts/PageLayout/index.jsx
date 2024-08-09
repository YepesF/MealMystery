import PropTypes from "prop-types";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useCycle } from "framer-motion";
import { useState } from "react";
import DrawerMenu from "./components/DrawerMenu";

const PageLayout = ({ children, className }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    toggleOpen();
    setMenuOpen(true);
  };
  const handleCloseMenu = () => {
    toggleOpen();
    setMenuOpen(false);
  };
  const baseStyle =
    "hd:w-full hd:h-full hd:min-h-screen flex flex-col justify-center items-center";
  return (
    <div className="w-full bg-primary dark:bg-primaryDark">
      <NavBar isOpen={isOpen} handleOpenMenu={handleOpenMenu} />
      <DrawerMenu isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
      <div className={`${baseStyle} ${className}`}>{children}</div>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageLayout;
