import PropTypes from "prop-types";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const PageLayout = ({ children, className }) => {
  const baseStyle =
    "w-full h-full min-h-screen flex flex-col justify-center items-center";
  return (
    <div className="w-full bg-primary">
      <NavBar />
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
