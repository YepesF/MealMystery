import PropTypes from "prop-types";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const PageLayout = ({ children }) => {
  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
