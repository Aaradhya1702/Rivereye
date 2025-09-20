import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "../Data"
import { InfoSection, Pricing } from '../components';
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
    </>
  )
}

export default Landing