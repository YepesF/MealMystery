import PropTypes from "prop-types";
import PageLayout from "../PageLayout";
import Hero from "./Sections/Hero";
import DietsSection from "./Sections/Diets";

const LandingPage = () => {
  return (
    <PageLayout>
      <Hero />
      <DietsSection />
    </PageLayout>
  );
};

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
