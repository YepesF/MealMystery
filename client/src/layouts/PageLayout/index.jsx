import PropTypes from "prop-types";
import NavBar from "../../components/NavBar";

const PageLayout = ({ children }) => {
  return (
    <div className="w-screen">
      <NavBar />
      <div className="w-full h-full flex flex-col justify-center items-center p-2">
        {children}
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
