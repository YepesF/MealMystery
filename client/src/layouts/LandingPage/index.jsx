import PropTypes from "prop-types";
import PageLayout from "../PageLayout";

const LandingPage = () => {
  return <PageLayout>Landing Page</PageLayout>;
};

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
