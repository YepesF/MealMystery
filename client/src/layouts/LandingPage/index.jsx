import PropTypes from "prop-types";

const LandingPage = ({children}) => {
  return (
    <div>{children}</div>
  );
};

LandingPage.propTypes = {
    children: PropTypes.node,
};

export default LandingPage;