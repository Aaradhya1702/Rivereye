import { InfoSec, InfoRow, InfoColumn, TextWrapper, TopLine, Heading, Subtitle, ImgWrapper, Img } from './InfoSection.elements';
import { Container, Button } from '../../globalStyles';
import { motion } from 'framer-motion';

const InfoSection = ({
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  img,
  alt,
  imgStart,
  start
}) => {

  // Motion variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <InfoSec lightBg={lightBg} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Background Circles */}
      <div style={bgCircle1}></div>
      <div style={bgCircle2}></div>
      <div style={bgCircle3}></div>

      {/* Gradient Overlay */}
      <div style={gradientOverlay}></div>

      <Container>
        <InfoRow imgStart={imgStart}>
          {/* Text Column */}
          <InfoColumn>
            <TextWrapper>
              <motion.div
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
              >
                <TopLine lightTopLine={lightTopLine} style={{ color: '#00b4d8' }}>{topLine}</TopLine>
                <Heading lightText={lightText} style={{
                  background: 'linear-gradient(120deg, #0077b6, #48cae4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '2px 2px 10px rgba(0,0,0,0.1)'
                }}>
                  {headline}
                </Heading>
                <Subtitle lightTextDesc={lightTextDesc} style={{  fontWeight: '500', lineHeight: '1.6em' }}>
                  {description}
                </Subtitle>
                {/* {index === 1 && (
                  <Link to='/dashboard'>
                    <Button big fontBig primary={primary} style={{
                      marginTop: '25px',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,119,182,0.3)',
                      background: 'linear-gradient(90deg, #0077b6, #48cae4)'
                    }}>
                      {buttonLabel}
                    </Button>
                  </Link>
                )} */}
              </motion.div>
            </TextWrapper>
          </InfoColumn>

          {/* Image Column */}
          <InfoColumn>
            <ImgWrapper start={start}>
              <div style={imageFrame}>
                <Img src={img} alt={alt} style={{ borderRadius: '20px', width: '100%', height: 'auto' }} />
              </div>
            </ImgWrapper>
          </InfoColumn>
        </InfoRow>
      </Container>
    </InfoSec>
  );
};

export default InfoSection;

// ================= Decorative Background Circles =================
const bgCircle1 = {
  position: 'absolute',
  top: '-120px',
  left: '-100px',
  width: '250px',
  height: '250px',
  background: 'rgba(0, 119, 182, 0.15)',
  borderRadius: '50%',
  filter: 'blur(100px)',
  zIndex: 0
};

const bgCircle2 = {
  position: 'absolute',
  bottom: '-140px',
  right: '-100px',
  width: '300px',
  height: '300px',
  background: 'rgba(144, 224, 239, 0.2)',
  borderRadius: '50%',
  filter: 'blur(120px)',
  zIndex: 0
};

const bgCircle3 = {
  position: 'absolute',
  top: '50%',
  right: '-150px',
  width: '200px',
  height: '200px',
  background: 'rgba(0, 119, 182, 0.1)',
  borderRadius: '50%',
  filter: 'blur(80px)',
  zIndex: 0
};

// ================= Gradient Overlay =================
const gradientOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, rgba(0,119,182,0.05), rgba(144,224,239,0.05))',
  zIndex: 0
};

// ================= Image Frame with Glow =================
const imageFrame = {
  padding: '10px',
  borderRadius: '25px',
  background: 'linear-gradient(145deg, #0077b6, #48cae4)',
  boxShadow: '0 20px 40px rgba(0,119,182,0.3)',
};
