import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "../Data"
import {  InfoSection } from '../components';
import FAQ from "../components/faq";
import Footer from "../components/footer";

import GlobalStyles from "../globalStyles";


const Landing = () => {
  return (
    <>
      <GlobalStyles />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      {/* <Pricing /> */}
      <InfoSection {...homeObjFour} />
      <FAQ />
      <Footer />
    </>
  )
}

export default Landing