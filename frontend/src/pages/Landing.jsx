import { motion } from "framer-motion";
import vd from '../images/vd.mp4'

import GlobalStyles from "../globalStyles";
import RiverEyeLanding from "../components/Bottom";


const Landing = () => {
  return (
    <>
      <GlobalStyles />
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={vd} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

        {/* Content */}
        <motion.div
          className="relative z-10 px-4 max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            🌊 Smarter Water. Safer Future.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-2xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Real-time Monitoring • AI Forecasting • Government Compliance
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-lg font-semibold shadow-lg transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white/80 hover:bg-white text-gray-900 rounded-full text-lg font-semibold shadow-lg transition">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </section>
      <RiverEyeLanding />
      {/* <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <Pricing /> 
      <InfoSection {...homeObjFour} /> */}
      
    </>
  )
}

export default Landing