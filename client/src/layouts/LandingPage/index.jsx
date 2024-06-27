import PropTypes from "prop-types";
import PageLayout from "../PageLayout";
import Hero from "./Sections/Hero";
import DietsSection from "./Sections/Diets";
import Favorites from "./Sections/Favorites";

const LandingPage = () => {
  return (
    <PageLayout>
      <Hero />
      <DietsSection />
      <Favorites />
    </PageLayout>
  );
};

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
