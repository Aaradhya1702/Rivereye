import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "../Data"
import { Footer, InfoSection, Pricing } from '../components';
import FAQ from "../components/faq";
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