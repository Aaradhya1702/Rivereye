import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "../Data"


const Landing = () => {
  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <Pricing />
      <InfoSection {...homeObjFour} />
    </>
  )
}

export default Landing