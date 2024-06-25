import PropTypes from "prop-types";
import PageLayout from "../PageLayout";
import Hero from "./Sections/Hero";

const LandingPage = () => {
  return (
    <PageLayout>
      <Hero />
    </PageLayout>
  );
};

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
