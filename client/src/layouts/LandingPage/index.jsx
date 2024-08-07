import PropTypes from "prop-types";
import PageLayout from "../PageLayout";
import Hero from "./Sections/Hero";
import DietsSection from "./Sections/Diets";
import Favorites from "./Sections/Favorites";
import Perks from "./Sections/Perks";
import Team from "./Sections/Team";

const LandingPage = () => {
  return (
    <PageLayout>
      <Hero />
      <DietsSection />
      <Favorites />
      <Perks />
      <Team />
    </PageLayout>
  );
};

LandingPage.propTypes = {
  children: PropTypes.node,
};

export default LandingPage;
