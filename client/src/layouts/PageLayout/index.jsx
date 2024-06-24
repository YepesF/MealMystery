import PropTypes from "prop-types";
import NavBar from "../../components/NavBar";

const PageLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <NavBar />
      {children}
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
